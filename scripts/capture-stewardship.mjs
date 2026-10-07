import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';

// Capture the real section at ordinary viewport heights. An enlarged viewport
// changes the hero's vh layout, and a CLI URL fragment alone does not prove that
// Chrome actually scrolled to or photographed the intended section.
const sourceSha = process.env.CANDIDATE_SHA;
assert.match(sourceSha ?? '', /^[0-9a-f]{40}$/);
assert.equal(execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), sourceSha);
const chrome = process.env.FOUNDATION_CHROME_BIN;
assert(chrome, 'Runner Chrome is required');
assert.equal(typeof WebSocket, 'function', 'Run this capture with declared Node 22');
const baseUrl = 'http://127.0.0.1:4173';
const destination = path.resolve('visual-proof');
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'foundation-stewardship-chrome-'));
const child = spawn(chrome, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  '--no-first-run', '--no-default-browser-check', '--remote-debugging-address=127.0.0.1',
  '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });
let stderr = '';
let startupError;
child.stderr.on('data', chunk => { stderr = (stderr + chunk.toString()).slice(-8000); });
child.on('error', error => { startupError = error; });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const stopped = () => child.exitCode !== null || child.signalCode !== null;
let socket;
const pending = new Map();
let nextId = 0;
const rejectPending = error => {
  for (const request of pending.values()) { clearTimeout(request.timer); request.reject(error); }
  pending.clear();
};
function command(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timer });
    try { socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })); }
    catch (error) { clearTimeout(timer); pending.delete(id); reject(error); }
  });
}
try {
  let activePort;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (startupError) throw startupError;
    if (stopped()) throw new Error(`Chrome exited before capture: ${stderr}`);
    try { activePort = (await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).trim().split('\n'); break; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    await delay(100);
  }
  assert(activePort?.length === 2, `Chrome DevTools endpoint unavailable: ${stderr}`);
  assert.match(activePort[0], /^\d+$/);
  assert.match(activePort[1], /^\/devtools\/browser\/[A-Za-z0-9-]+$/);
  socket = new WebSocket(`ws://127.0.0.1:${activePort[0]}${activePort[1]}`);
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Chrome WebSocket connection timed out')), 10000);
    socket.addEventListener('open', () => { clearTimeout(timer); resolve(); }, { once: true });
    socket.addEventListener('error', () => { clearTimeout(timer); reject(new Error('Chrome WebSocket connection failed')); }, { once: true });
  });
  socket.addEventListener('message', event => {
    let response;
    try { response = JSON.parse(String(event.data)); }
    catch (error) { rejectPending(error); return; }
    const request = pending.get(response.id);
    if (!request) return;
    clearTimeout(request.timer); pending.delete(response.id);
    if (response.error) request.reject(new Error(JSON.stringify(response.error)));
    else request.resolve(response.result);
  });
  socket.addEventListener('close', () => rejectPending(new Error('Chrome connection closed')));
  socket.addEventListener('error', () => rejectPending(new Error('Chrome connection failed')));
  const browser = await command('Browser.getVersion');
  await fs.mkdir(path.join(destination, 'screens'), { recursive: true });
  const captures = [];
  for (const viewport of [{ width: 430, height: 932 }, { width: 1440, height: 1000 }]) {
    const { targetId } = await command('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await command('Target.attachToTarget', { targetId, flatten: true });
    await command('Page.enable', {}, sessionId);
    await command('Runtime.enable', {}, sessionId);
    await command('Emulation.setDeviceMetricsOverride', { ...viewport, deviceScaleFactor: 1, mobile: false }, sessionId);
    await command('Page.bringToFront', {}, sessionId);
    const navigation = await command('Page.navigate', { url: `${baseUrl}/governance/` }, sessionId);
    assert(!navigation.errorText, navigation.errorText);
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      const result = await command('Runtime.evaluate', { expression: `location.origin === ${JSON.stringify(baseUrl)} && location.pathname === '/governance/' && document.readyState === 'complete' && document.getElementById('stewardship') !== null`, returnByValue: true }, sessionId);
      if (result.result?.value === true) { ready = true; break; }
      await delay(100);
    }
    assert(ready, 'Governance document did not finish loading');
    const observed = await command('Runtime.evaluate', {
      awaitPromise: true, returnByValue: true,
      expression: `(async () => {
        if (location.origin !== ${JSON.stringify(baseUrl)} || location.pathname !== '/governance/') throw new Error('Unexpected capture route');
        await document.fonts.ready;
        const section = document.getElementById('stewardship');
        if (!section) throw new Error('Missing stewardship section');
        section.scrollIntoView({ behavior: 'instant', block: 'start' });
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const geometry = element => {
          const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
          if (!element.getClientRects().length || rect.width <= 0 || rect.height <= 0 || style.display === 'none' || style.visibility !== 'visible' || Number(style.opacity) <= 0) throw new Error('Invisible stewardship content');
          return { x: rect.left + scrollX, y: rect.top + scrollY, width: rect.width, height: rect.height };
        };
        const clip = geometry(section);
        const cards = [...section.querySelectorAll('.foundation-card')].map(card => ({ title: card.querySelector('h3')?.textContent.trim(), ...geometry(card) }));
        const heading = section.querySelector('h2')?.textContent.trim();
        return { heading, clip, cards, viewport: { width: innerWidth, height: innerHeight }, scrollY, documentHeight: document.documentElement.scrollHeight };
      })()`,
    }, sessionId);
    assert(!observed.exceptionDetails, JSON.stringify(observed.exceptionDetails));
    const evidence = observed.result?.value;
    assert.equal(evidence?.heading, 'Preserve the mission across generations of responsibility.');
    assert.deepEqual(evidence.viewport, viewport);
    assert.deepEqual(evidence.cards.map(card => card.title), ['Preserve the mission', 'Carry responsibility forward', 'Ground succession in authority', 'Make responsibility traceable']);
    assert(evidence.scrollY > 0, 'Capture must leave the hero');
    const clip = { ...evidence.clip, scale: 1 };
    assert(Object.values(clip).every(Number.isFinite));
    assert(clip.x >= 0 && clip.y > 0 && clip.width > 0 && clip.height > 0 && clip.y + clip.height <= evidence.documentHeight + 1);
    for (const card of evidence.cards) assert(card.x >= clip.x - 1 && card.y >= clip.y - 1 && card.x + card.width <= clip.x + clip.width + 1 && card.y + card.height <= clip.y + clip.height + 1, 'Card is clipped outside the captured section');
    const screenshot = await command('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: true, clip }, sessionId);
    const bytes = Buffer.from(screenshot.data, 'base64');
    assert(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])));
    assert(Math.abs(bytes.readUInt32BE(16) - clip.width) <= 1 && Math.abs(bytes.readUInt32BE(20) - clip.height) <= 1, 'Screenshot dimensions do not match actual section geometry');
    const filename = `screens/governance-stewardship-${viewport.width}-section.png`;
    await fs.writeFile(path.join(destination, filename), bytes);
    captures.push({ ...evidence, screenshot: filename, imageWidth: bytes.readUInt32BE(16), imageHeight: bytes.readUInt32BE(20), sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
    await command('Target.closeTarget', { targetId });
  }
  const receipt = { sourceSha, capturedAt: new Date().toISOString(), browser: browser.product, node: process.version, method: 'Explicit actual-section scroll, four visible-card geometry guards and CDP full-section clipping at ordinary viewport heights', captures, scope: 'Source browser section observation only; no physical-device, native zoom, full accessibility, deployed-domain, legal or release acceptance' };
  await fs.writeFile(path.join(destination, 'stewardship-capture.json'), `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(JSON.stringify({ sourceSha, sectionCaptures: captures.length, cardsPerCapture: 4, viewports: captures.map(item => item.viewport), scope: receipt.scope }));
} finally {
  rejectPending(new Error('Capture finished'));
  socket?.close();
  if (child.pid && !stopped()) child.kill('SIGTERM');
  for (let attempt = 0; child.pid && attempt < 30 && !stopped(); attempt++) await delay(100);
  if (child.pid && !stopped()) {
    child.kill('SIGKILL');
    for (let attempt = 0; attempt < 30 && !stopped(); attempt++) await delay(100);
    assert(stopped(), 'Owned capture Chrome did not stop');
  }
  await fs.rm(profile, { recursive: true, force: true });
}
