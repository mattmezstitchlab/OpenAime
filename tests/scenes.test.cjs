const {test}=require('node:test');const assert=require('node:assert/strict');
const scenes=require('../OPENAIME/scenes.js');
test('scene contract is explicit, local and decorative',()=>{
 assert.equal(scenes.length,6);assert.equal(new Set(scenes.map(s=>s.id)).size,6);
 for(const s of scenes){assert.equal(s.version,1);assert.equal(s.mode,'manual');assert.equal(s.meaning,'decorative');assert.equal(s.audience,'local');assert.equal(s.narration,null);assert.ok(['matin','jour','nuit','golden'].includes(s.phase));assert.ok(['automne','hiver','ete','printemps'].includes(s.season));assert.ok(['clair','brume','pluie','neige'].includes(s.weather));assert.ok(Object.isFrozen(s));}
});
const fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('OPENAIME/index.html','utf8');
const block=html.slice(html.indexOf('  let scenePrevious = null;'),html.indexOf('  // La publication historique'));
test('multiple previews preserve one return point and restore it',()=>{
 const nodes={};function node(){return {children:[],events:{},hidden:true,disabled:true,addEventListener(n,f){this.events[n]=f},append(...x){this.children.push(...x)},setAttribute(){},focus(){}}}
 const $=id=>nodes[id] ||= node();const log=[];
 const ctx={window:{OpenAimeScenes:scenes},document:{createElement:node},$,seasonSel:'auto',weatherSel:'nuageux',live:false,targetMin:123,curMin:123,range:{},PHASES:[{id:'matin',center:500},{id:'jour',center:900},{id:'nuit',center:100},{id:'golden',center:1100}],buildDay(){},buildWeatherAndSeason(){},setLive(v){ctx.live=v;log.push(v)}};
 vm.runInNewContext(block,ctx);
 nodes.sceneTiles.children[0].events.click();nodes.sceneTiles.children[2].events.click();
 assert.equal(ctx.weatherSel,'clair');assert.equal(ctx.targetMin,100);
 nodes.sceneRestore.events.click();assert.equal(ctx.seasonSel,'auto');assert.equal(ctx.weatherSel,'nuageux');assert.equal(ctx.targetMin,123);assert.equal(nodes.sceneRestore.disabled,true);
});
