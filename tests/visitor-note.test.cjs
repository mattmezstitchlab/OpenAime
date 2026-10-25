const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const code=fs.readFileSync('OPENAIME/visitor-note.js','utf8');
function setup(){
 const nodes={},events={},windowEvents={};let target;
 function node(){return {hidden:true,value:'',isConnected:true,attrs:{},events:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,f){this.events[k]=f},focus(){this.focused=true},reportValidity(){return true},reset(){},classList:{add(){},remove(){}}}}
 const $=id=>nodes[id] ||= node();
 const document={activeElement:$('postitBtn'),getElementById:$,querySelector(){return null},body:{classList:{add(){},remove(){}}},addEventListener(k,f){events[k]=f}};
 vm.runInNewContext(code,{document,window:{confirm(){return true},location:{assign(url){target=url}},addEventListener(k,f){windowEvents[k]=f}},clearTimeout(){},setTimeout(){}});
 return {nodes,$,events,windowEvents,get target(){return target}};
}
test('post-it opens capsule, Escape returns without losing the draft',()=>{const x=setup();x.events['openaime:compose']();assert.equal(x.$('visitorNote').hidden,false);x.$('visitorNoteText').value='Un brouillon conservé';x.$('visitorNote').events.keydown({key:'Escape',stopPropagation(){}});assert.equal(x.$('visitorNote').hidden,true);assert.equal(x.$('visitorNoteText').value,'Un brouillon conservé');assert.equal(x.$('postitBtn').focused,true)});
test('handoff is explicit, fixed destination, fragment with date and place',()=>{const x=setup();assert.equal(x.target,undefined);x.$('visitorNoteText').value='Bonjour, une demande pour notre mariage.';x.$('noteDate').value='2027-05-22';x.$('notePlace').value='Lille';x.$('visitorNote').events.submit({preventDefault(){}});const url=new URL(x.target);assert.equal(url.origin,'https://aimestudio.vercel.app');assert.equal(url.search,'');const msg=new URLSearchParams(url.hash.slice(1)).get('mot');assert.ok(msg.includes('Lille'));assert.ok(msg.includes('2027-05-22'));assert.ok(!code.includes('fetch('));assert.ok(!code.includes('localStorage'))});
test('short or blank message does not navigate',()=>{const x=setup();x.$('visitorNoteText').value='   ';x.$('visitorNote').events.submit({preventDefault(){}});assert.equal(x.target,undefined);assert.equal(x.$('visitorNoteText').focused,true)});
test('unsaved edit warns on accidental navigation but not deliberate handoff',()=>{const x=setup();x.$('visitorNote').events.input();let warned=false;x.windowEvents.beforeunload({preventDefault(){warned=true}});assert.equal(warned,true);x.$('visitorNoteText').value='Bonjour, un message suffisamment long.';x.$('visitorNote').events.submit({preventDefault(){}});warned=false;x.windowEvents.beforeunload({preventDefault(){warned=true}});assert.equal(warned,false)});
