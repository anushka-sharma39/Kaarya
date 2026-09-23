import { JSDOM } from 'jsdom';
import { createServer } from 'vite';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/', pretendToBeVisual: true,
});
global.window = dom.window; global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element; global.Node = dom.window.Node;
global.localStorage = dom.window.localStorage;
Object.defineProperty(global, 'location', { value: dom.window.location, configurable: true });
global.getComputedStyle = dom.window.getComputedStyle;
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = clearTimeout;
global.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.matchMedia = dom.window.matchMedia || (() => ({ matches:false, addEventListener(){}, removeEventListener(){}, addListener(){}, removeListener(){} }));
global.matchMedia = dom.window.matchMedia;
dom.window.Element.prototype.scrollIntoView = function () {};
dom.window.HTMLElement.prototype.scrollTo = function () {};
dom.window.scrollTo = () => {};
global.scrollTo = () => {};
dom.window.HTMLCanvasElement.prototype.getContext = () => null;
class RO { observe(){} unobserve(){} disconnect(){} }
global.ResizeObserver = dom.window.ResizeObserver = RO;
global.IntersectionObserver = dom.window.IntersectionObserver = class { constructor(){} observe(){} unobserve(){} disconnect(){} };

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const ReactMod = await import('react');
const React = ReactMod.default ?? ReactMod;
const { act } = ReactMod;
const { createRoot } = await import('react-dom/client');
const { MemoryRouter } = await import('react-router-dom');
const { AuthProvider } = await vite.ssrLoadModule('/src/app/auth/AuthContext.jsx');
const AppRoutes = (await vite.ssrLoadModule('/src/app/routes.jsx')).default;


const results = [];
function check(name, cond, extra='') { results.push([cond ? 'PASS':'FAIL', name, extra]); }

const errors = [];
const origError = console.error;
console.error = (...a) => { const s = a.map(String).join(' '); if (!s.includes('not wrapped in act')) errors.push(s.slice(0,200)); };

async function render(initialPath) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(React.createElement(AuthProvider, null,
      React.createElement(MemoryRouter, { initialEntries: [initialPath] },
        React.createElement(AppRoutes))));
  });
  for (let i=0;i<60;i++) {
    await act(async () => { await new Promise(r=>setTimeout(r,50)); });
    const html = container.innerHTML;
    if (html.length > 400 && !html.includes('platform-loading')) break;
  }
  return { container, root, text: () => container.textContent, html: () => container.innerHTML };
}

const click = async (el) => { await act(async () => { el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true })); }); await act(async () => { await new Promise(r=>setTimeout(r,120)); }); };

// --- every customer route renders ---
localStorage.setItem('kaarya-session', JSON.stringify({isLoggedIn:true, role:'customer'}));
for (const [path, marker] of [['/customer','navbar'],['/customer/services','navbar'],['/customer/services/plumbing','navbar'],
  ['/customer/ai-diagnosis','navbar'],['/customer/find-worker','navbar'],['/customer/orders','navbar'],
  ['/customer/saved-workers','navbar'],['/customer/profile','customer-profile-page'],['/customer/worker/1','navbar']]) {
  const v = await render(path);
  check(`customer route ${path} renders`, v.html().includes(marker) && v.html().length > 2000, `len=${v.html().length}`);
  v.root.unmount();
}

// --- logout from the customer role menu ---
let v = await render('/customer');
await click(v.container.querySelector('.krm-trigger'));
const logoutBtn = [...v.container.querySelectorAll('.krm-item')].find(b => b.textContent.includes('Logout'));
check('customer role menu has Logout', !!logoutBtn);
await click(logoutBtn);
check('logout clears the session', localStorage.getItem('kaarya-session') === null, String(localStorage.getItem('kaarya-session')));
check('logout returns to the login gate', v.text().includes('Welcome to Kaarya'));
v.root.unmount();

// --- switch role: customer -> worker (with confirmation) ---
localStorage.setItem('kaarya-session', JSON.stringify({isLoggedIn:true, role:'customer'}));
v = await render('/customer');
await click(v.container.querySelector('.krm-trigger'));
const switchBtn = [...v.container.querySelectorAll('.krm-item')].find(b => b.textContent.includes('Switch to Worker'));
check('customer menu offers Switch to Worker', !!switchBtn);
await click(switchBtn);
check('switch shows a confirmation dialog', v.text().includes('Switch to Gig Worker mode?') && v.text().includes("You'll be taken to the Worker dashboard."));
await click([...v.container.querySelectorAll('.krm-btn-solid')][0]);
for (let i=0;i<40;i++) { await act(async () => { await new Promise(r=>setTimeout(r,50)); }); if (v.html().includes('krm-worker')) break; }
check('confirming switches the stored role', JSON.parse(localStorage.getItem('kaarya-session')).role === 'worker');
check('confirming lands on the worker dashboard', v.html().includes('krm-worker'));
v.root.unmount();

// --- every worker route renders ---
for (const path of ['/worker','/worker/dashboard','/worker/gigs','/worker/gigs/1','/worker/applications','/worker/work',
                    '/worker/profile','/worker/verification','/worker/community','/worker/messages','/worker/welfare']) {
  const w = await render(path);
  check(`worker route ${path} renders`, w.html().includes('krm-worker') && w.html().length > 2000, `len=${w.html().length}`);
  w.root.unmount();
}

// --- switch back: worker -> customer ---
v = await render('/worker/dashboard');
await click(v.container.querySelector('.krm-trigger'));
const backBtn = [...v.container.querySelectorAll('.krm-item')].find(b => b.textContent.includes('Switch to Customer'));
check('worker menu offers Switch to Customer', !!backBtn);
await click(backBtn);
await click([...v.container.querySelectorAll('.krm-btn-solid')][0]);
for (let i=0;i<40;i++) { await act(async () => { await new Promise(r=>setTimeout(r,50)); }); if (v.html().includes('kaarya-app')) break; }
check('worker can switch back to customer', JSON.parse(localStorage.getItem('kaarya-session')).role === 'customer' && v.html().includes('kaarya-app'));
v.root.unmount();

console.error = origError;
await vite.close();
let failed = 0;
for (const [s,n,e] of results) { if (s==='FAIL') failed++; console.log(`${s}  ${n}${e && s==='FAIL' ? '  -> '+e : ''}`); }
console.log('\nconsole.error count during renders:', errors.length);
errors.slice(0,8).forEach(e => console.log('  !', e));
console.log(failed ? `\n${failed} FAILED` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
