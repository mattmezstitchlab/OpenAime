const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../OPENAIME/index.html'), 'utf8');
const app = html.match(/<script id="oa-app">([\s\S]*?)<\/script>/)[1];
const guide = app.slice(app.indexOf("  const guideToggle ="), app.indexOf('\n\n  applySettings();\n\n  /* ───────── Boucle'));
function setup(seen = '', blocked = false) {
  const elements = {};
  for (const id of ['guideToggle', 'windowGuide', 'guideClose']) {
    elements[id] = { hidden: true, attrs: {}, events: {}, focused: false,
      setAttribute(k, v) { this.attrs[k] = v; },
      addEventListener(k, v) { this.events[k] = v; },
      focus() { this.focused = true; } };
  }
  const values = new Map([['openaime:guide-seen:v1', seen]]);
  const storage = app.slice(app.indexOf('  const store ='), app.indexOf('\n\n  /* ───────── Réglages'));
  vm.runInNewContext(storage + '\n' + guide, {
    $: id => elements[id], localStorage: {
      getItem(k) { if (blocked) throw Error('blocked'); return values.get(k); },
      setItem(k, v) { if (blocked) throw Error('blocked'); values.set(k, v); }
    }
  });
  return { elements, values };
}
test('the complete application parses', () => { new vm.Script(app); });
test('first visit offers help without moving keyboard focus', () => {
  const { elements: e } = setup();
  assert.equal(e.windowGuide.hidden, false);
  assert.equal(e.guideToggle.attrs['aria-expanded'], 'true');
  assert.equal(e.guideToggle.focused, false);
});
test('dismiss remembers the choice and returns focus; help can reopen', () => {
  const { elements: e, values } = setup();
  e.guideClose.events.click();
  assert.equal(e.windowGuide.hidden, true);
  assert.equal(e.guideToggle.focused, true);
  assert.equal(values.get('openaime:guide-seen:v1'), '1');
  e.guideToggle.events.click();
  assert.equal(e.windowGuide.hidden, false);
});
test('returning visitors keep the scene unobstructed', () => {
  assert.equal(setup('1').elements.windowGuide.hidden, true);
});
test('Escape closes help and does not propagate to the editor', () => {
  const { elements: e } = setup();
  let stopped = false;
  e.windowGuide.events.keydown({ key: 'Escape', stopPropagation() { stopped = true; } });
  assert.equal(e.windowGuide.hidden, true);
  assert.equal(stopped, true);
});
test('blocked browser storage does not break help', () => {
  const { elements: e } = setup('', true);
  e.guideClose.events.click();
  assert.equal(e.windowGuide.hidden, true);
});
