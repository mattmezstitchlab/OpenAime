const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const code=fs.readFileSync('OPENAIME/visitor-note.js','utf8');
function setup(host='openaime.vercel.app'){
 const elements={};
 for(const id of ['visitorNoteToggle','visitorNote','visitorNoteText','visitorNoteContinue','postitBtn']) elements[id]={events:{},addEventListener(n,f){this.events[n]=f},showModal(){this.open=true},focus(){this.focused=true}};
 elements.visitorNoteContinue.href='https://aimestudio.vercel.app/contact/openaime/';
 elements.visitorNoteText.value='Bonjour, une question pour mon mariage & une date ?';
 vm.runInNewContext(code,{window:{location:{hostname:host}},document:{getElementById(id){return elements[id]}}});
 return elements;
}
test('draft goes only into fragment after deliberate click',()=>{
 const e=setup();
 assert.equal(e.visitorNoteContinue.href,'https://aimestudio.vercel.app/contact/openaime/');
 e.visitorNoteContinue.events.click();
 const u=new URL(e.visitorNoteContinue.href);
 assert.equal(u.search,'');
 assert.equal(new URLSearchParams(u.hash.slice(1)).get('mot'),e.visitorNoteText.value);
 assert.ok(!code.includes('fetch('));
 assert.ok(!code.includes('localStorage'));
});
test('returns keyboard focus to the scene post-it on close',()=>{
 const e=setup();
 e.visitorNote.events.close();assert.equal(e.postitBtn.focused,true);
});
test('preview stays separate from public destination',()=>{
 const e=setup('openaime-git-feat-windo-1bf9ec-matthieulecointre-9534s-projects.vercel.app');
 assert.ok(e.visitorNoteContinue.href.includes('aimestudio-git-feat-ope-'));
});
