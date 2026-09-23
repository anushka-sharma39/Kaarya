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

async function render(initialPath) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(React.createElement(AuthProvider, null,
      React.createElement(MemoryRouter, { initialEntries: [initialPath] },
        React.createElement(AppRoutes))));
  });
  // wait for lazy chunks / redirects to settle
  for (let i=0;i<60;i++) {
    await act(async () => { await new Promise(r=>setTimeout(r,50)); });
    const html = container.innerHTML;
    if (html.length > 400 && !html.includes('platform-loading')) break;
  }
  return { container, root, text: () => container.textContent, html: () => container.innerHTML };
}

// 1. fresh visit -> login gate
localStorage.clear();
let v = await render('/');
check('/ with no session shows role selection', v.text().includes('Welcome to Kaarya') && v.text().includes('Continue as Gig Worker'));
check('login gate shows brand tagline', v.text().includes('Kaam bhi. Kamaai bhi. Community bhi.'));

// 2. click Continue as Customer
const btns = [...v.container.querySelectorAll('button.rs-cta')];
check('two role CTAs rendered', btns.length === 2);
await act(async () => { btns[0].dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true })); });
check('customer session persisted to localStorage', localStorage.getItem('kaarya-session') === JSON.stringify({isLoggedIn:true, role:'customer'}), localStorage.getItem('kaarya-session'));
v.root.unmount();

// 3. reload as customer
v = await render('/');
check('reload with customer session lands on customer site', v.html().includes('kaarya-app') && v.text().toLowerCase().includes('kaarya'));
check('customer navbar role menu present', v.html().includes('krm-customer'));
v.root.unmount();

// 4. customer tries /worker -> bounced to /customer
v = await render('/worker/dashboard');
check('customer blocked from /worker', v.html().includes('kaarya-app') && !v.html().includes('krm-worker'));
v.root.unmount();

// 5. switch to worker via stored role
localStorage.setItem('kaarya-session', JSON.stringify({isLoggedIn:true, role:'worker'}));
v = await render('/');
check('reload with worker session lands on worker app', v.html().includes('krm-worker'));
check('worker sidebar links prefixed', v.html().includes('/worker/gigs'));
v.root.unmount();

// 6. worker tries /customer -> bounced to /worker
v = await render('/customer/orders');
check('worker blocked from /customer', v.html().includes('krm-worker') && !v.html().includes('kaarya-app'));
v.root.unmount();

// 7. logged out cannot reach either app
localStorage.clear();
v = await render('/customer/orders');
check('logged out blocked from /customer', v.text().includes('Welcome to Kaarya'));
v.root.unmount();
v = await render('/worker/dashboard');
check('logged out blocked from /worker', v.text().includes('Welcome to Kaarya'));
v.root.unmount();

await vite.close();
let failed = 0;
for (const [s,n,e] of results) { if (s==='FAIL') failed++; console.log(`${s}  ${n}${e?'  -> '+e:''}`); }
console.log(failed ? `\n${failed} FAILED` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
