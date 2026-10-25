const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('OPENAIME/index.html','utf8');
const start=html.indexOf('  pnSave.hidden = true;');
const code=html.slice(start,html.indexOf('  // La publication historique',start));
function setup(){
 const nodes={};const state={panel:{hidden:true},save:{hidden:false},status:{},opens:0,closes:0};
 function $(id){return nodes[id] ||= {events:{},addEventListener(k,f){this.events[k]=f},focus(){this.focused=true},showModal(){this.open=true}}}
 vm.runInNewContext(code,{$,panel:state.panel,pnSave:state.save,pnStatus:state.status,openPanel(){state.opens++;state.panel.hidden=false},closePanel(){state.closes++;state.panel.hidden=true},setMusicMode(v){state.music=v},musicMode:true,mPlay:$('mPlay'),toast(){}});
 return {state,nodes,$};
}
test('public customization does not enable publishing',()=>{
 const {state,$}=setup();assert.equal(state.save.hidden,true);
 $('toolCustomize').events.click();assert.equal(state.opens,1);
 $('toolCustomize').events.click();assert.equal(state.closes,1);
 assert.ok(state.status.textContent.includes('local'));
});
test('time and music share existing player and close editing',()=>{
 const {state,$}=setup();$('toolCustomize').events.click();
 $('toolMusic').events.click();assert.equal(state.panel.hidden,true);assert.equal(state.music,true);
 $('toolTime').events.click();assert.equal(state.music,false);assert.equal($('timeRange').focused,true);
});
test('message tool only opens the draft modal',()=>{
 const {$}=setup();$('toolMessage').events.click();assert.equal($('visitorNote').open,true);
 assert.ok(!code.includes('fetch('));
});
