function b(){}const ct=t=>t;function lt(t,e){for(const n in e)t[n]=e[n];return t}function ot(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function Q(t){return t()}function H(){return Object.create(null)}function E(t){t.forEach(Q)}function q(t){return typeof t=="function"}function Ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function ut(t){return Object.keys(t).length===0}function at(t,...e){if(t==null)return b;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function It(t,e,n){t.$$.on_destroy.push(at(e,n))}function Ht(t,e,n,r){if(t){const i=U(t,e,n,r);return t[0](i)}}function U(t,e,n,r){return t[1]&&r?lt(n.ctx.slice(),t[1](r(e))):n.ctx}function Gt(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const u=[],c=Math.max(e.dirty.length,i.length);for(let s=0;s<c;s+=1)u[s]=e.dirty[s]|i[s];return u}return e.dirty|i}return e.dirty}function Jt(t,e,n,r,i,u){if(i){const c=U(e,n,r,u);t.p(c,i)}}function Kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function Qt(t,e,n){return t.set(n),e}function Ut(t){return t&&q(t.destroy)?t.destroy:b}const V=typeof window<"u";let ft=V?()=>window.performance.now():()=>Date.now(),L=V?t=>requestAnimationFrame(t):b;const v=new Set;function X(t){v.forEach(e=>{e.c(t)||(v.delete(e),e.f())}),v.size!==0&&L(X)}function dt(t){let e;return v.size===0&&L(X),{promise:new Promise(n=>{v.add(e={c:t,f:n})}),abort(){v.delete(e)}}}const _t=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;"WeakMap"in _t;let P=!1;function ht(){P=!0}function mt(){P=!1}function pt(t,e,n,r){for(;t<e;){const i=t+(e-t>>1);n(i)<=r?t=i+1:e=i}return t}function yt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&l.push(f)}e=l}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let i=0;for(let l=0;l<e.length;l++){const o=e[l].claim_order,f=(i>0&&e[n[i]].claim_order<=o?i+1:pt(1,i,_=>e[n[_]].claim_order,o))-1;r[l]=n[f]+1;const a=f+1;n[a]=l,i=Math.max(a,i)}const u=[],c=[];let s=e.length-1;for(let l=n[i]+1;l!=0;l=r[l-1]){for(u.push(e[l-1]);s>=l;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);u.reverse(),c.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<c.length;l++){for(;o<u.length&&c[l].claim_order>=u[o].claim_order;)o++;const f=o<u.length?u[o]:null;t.insertBefore(c[l],f)}}function gt(t,e){t.appendChild(e)}function Y(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function bt(t){const e=tt("style");return xt(Y(t),e),e.sheet}function xt(t,e){return gt(t.head||t,e),e.sheet}function wt(t,e){if(P){for(yt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Vt(t,e,n){P&&!n?wt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Z(t){t.parentNode&&t.parentNode.removeChild(t)}function Xt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function tt(t){return document.createElement(t)}function W(t){return document.createTextNode(t)}function Yt(){return W(" ")}function Zt(){return W("")}function te(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function ee(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $t(t){return Array.from(t.childNodes)}function vt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function et(t,e,n,r,i=!1){vt(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const l=n(s);return l===void 0?t.splice(c,1):t[c]=l,i||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const l=n(s);return l===void 0?t.splice(c,1):t[c]=l,i?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return r()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function kt(t,e,n,r){return et(t,i=>i.nodeName===e,i=>{const u=[];for(let c=0;c<i.attributes.length;c++){const s=i.attributes[c];n[s.name]||u.push(s.name)}u.forEach(c=>i.removeAttribute(c))},()=>r(e))}function ne(t,e,n){return kt(t,e,n,tt)}function Et(t,e){return et(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>W(e),!0)}function re(t){return Et(t," ")}function ie(t,e){e=""+e,t.data!==e&&(t.data=e)}function se(t,e,n,r){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function ce(t,e,n){for(let r=0;r<t.options.length;r+=1){const i=t.options[r];if(i.__value===e){i.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function le(t){const e=t.querySelector(":checked");return e&&e.__value}function Nt(t,e,{bubbles:n=!1,cancelable:r=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,r,e),i}function oe(t,e){return new t(e)}const j=new Map;let M=0;function St(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function At(t,e){const n={stylesheet:bt(e),rules:{}};return j.set(t,n),n}function G(t,e,n,r,i,u,c,s=0){const l=16.666/r;let o=`{
`;for(let g=0;g<=1;g+=l){const x=e+(n-e)*u(g);o+=g*100+`%{${c(x,1-x)}}
`}const f=o+`100% {${c(n,1-n)}}
}`,a=`__svelte_${St(f)}_${s}`,_=Y(t),{stylesheet:d,rules:h}=j.get(_)||At(_,t);h[a]||(h[a]=!0,d.insertRule(`@keyframes ${a} ${f}`,d.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${a} ${r}ms linear ${i}ms 1 both`,M+=1,a}function Ct(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?u=>u.indexOf(e)<0:u=>u.indexOf("__svelte")===-1),i=n.length-r.length;i&&(t.style.animation=r.join(", "),M-=i,M||jt())}function jt(){L(()=>{M||(j.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&Z(e)}),j.clear())})}let S;function p(t){S=t}function F(){if(!S)throw new Error("Function called outside component initialization");return S}function ue(t){F().$$.on_mount.push(t)}function ae(t){F().$$.after_update.push(t)}const $=[],J=[];let k=[];const K=[],nt=Promise.resolve();let B=!1;function rt(){B||(B=!0,nt.then(I))}function fe(){return rt(),nt}function O(t){k.push(t)}const R=new Set;let w=0;function I(){if(w!==0)return;const t=S;do{try{for(;w<$.length;){const e=$[w];w++,p(e),Mt(e.$$)}}catch(e){throw $.length=0,w=0,e}for(p(null),$.length=0,w=0;J.length;)J.pop()();for(let e=0;e<k.length;e+=1){const n=k[e];R.has(n)||(R.add(n),n())}k.length=0}while($.length);for(;K.length;)K.pop()();B=!1,R.clear(),p(t)}function Mt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}function Ot(t){const e=[],n=[];k.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),k=e}let N;function qt(){return N||(N=Promise.resolve(),N.then(()=>{N=null})),N}function z(t,e,n){t.dispatchEvent(Nt(`${e?"intro":"outro"}${n}`))}const C=new Set;let y;function Pt(){y={r:0,c:[],p:y}}function Tt(){y.r||E(y.c),y=y.p}function it(t,e){t&&t.i&&(C.delete(t),t.i(e))}function Dt(t,e,n,r){if(t&&t.o){if(C.has(t))return;C.add(t),y.c.push(()=>{C.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}const Rt={duration:0};function de(t,e,n,r){const i={direction:"both"};let u=e(t,n,i),c=r?0:1,s=null,l=null,o=null;function f(){o&&Ct(t,o)}function a(d,h){const m=d.b-c;return h*=Math.abs(m),{a:c,b:d.b,d:m,duration:h,start:d.start,end:d.start+h,group:d.group}}function _(d){const{delay:h=0,duration:m=300,easing:g=ct,tick:x=b,css:T}=u||Rt,D={start:ft()+h,b:d};d||(D.group=y,y.r+=1),s||l?l=D:(T&&(f(),o=G(t,c,d,m,h,g,T)),d&&x(0,1),s=a(D,m),O(()=>z(t,d,"start")),dt(A=>{if(l&&A>l.start&&(s=a(l,m),l=null,z(t,s.b,"start"),T&&(f(),o=G(t,c,s.b,s.duration,0,g,u.css))),s){if(A>=s.end)x(c=s.b,1-c),z(t,s.b,"end"),l||(s.b?f():--s.group.r||E(s.group.c)),s=null;else if(A>=s.start){const st=A-s.start;c=s.a+s.d*g(st/s.duration),x(c,1-c)}}return!!(s||l)}))}return{run(d){q(u)?qt().then(()=>{u=u(i),_(d)}):_(d)},end(){f(),s=l=null}}}function _e(t,e){const n=e.token={};function r(i,u,c,s){if(e.token!==n)return;e.resolved=s;let l=e.ctx;c!==void 0&&(l=l.slice(),l[c]=s);const o=i&&(e.current=i)(l);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,_)=>{_!==u&&a&&(Pt(),Dt(a,1,1,()=>{e.blocks[_]===a&&(e.blocks[_]=null)}),Tt())}):e.block.d(1),o.c(),it(o,1),o.m(e.mount(),e.anchor),f=!0),e.block=o,e.blocks&&(e.blocks[u]=o),f&&I()}if(ot(t)){const i=F();if(t.then(u=>{p(i),r(e.then,1,e.value,u),p(null)},u=>{if(p(i),r(e.catch,2,e.error,u),p(null),!e.hasCatch)throw u}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function he(t,e,n){const r=e.slice(),{resolved:i}=t;t.current===t.then&&(r[t.value]=i),t.current===t.catch&&(r[t.error]=i),t.block.p(r,n)}const zt=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...zt];function me(t){t&&t.c()}function pe(t,e){t&&t.l(e)}function Bt(t,e,n,r){const{fragment:i,after_update:u}=t.$$;i&&i.m(e,n),r||O(()=>{const c=t.$$.on_mount.map(Q).filter(q);t.$$.on_destroy?t.$$.on_destroy.push(...c):E(c),t.$$.on_mount=[]}),u.forEach(O)}function Lt(t,e){const n=t.$$;n.fragment!==null&&(Ot(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Wt(t,e){t.$$.dirty[0]===-1&&($.push(t),rt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ye(t,e,n,r,i,u,c,s=[-1]){const l=S;p(t);const o=t.$$={fragment:null,ctx:[],props:u,update:b,not_equal:i,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:H(),dirty:s,skip_bound:!1,root:e.target||l.$$.root};c&&c(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(a,_,...d)=>{const h=d.length?d[0]:_;return o.ctx&&i(o.ctx[a],o.ctx[a]=h)&&(!o.skip_bound&&o.bound[a]&&o.bound[a](h),f&&Wt(t,a)),_}):[],o.update(),f=!0,E(o.before_update),o.fragment=r?r(o.ctx):!1,e.target){if(e.hydrate){ht();const a=$t(e.target);o.fragment&&o.fragment.l(a),a.forEach(Z)}else o.fragment&&o.fragment.c();e.intro&&it(t.$$.fragment),Bt(t,e.target,e.anchor,e.customElement),mt(),I()}p(l)}class ge{$destroy(){Lt(this,1),this.$destroy=b}$on(e,n){if(!q(n))return b;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(e){this.$$set&&!ut(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Bt as A,Lt as B,Ht as C,Jt as D,Kt as E,Gt as F,wt as G,b as H,It as I,te as J,ct as K,O as L,ce as M,Xt as N,E as O,Qt as P,le as Q,de as R,ge as S,_e as T,he as U,Ut as V,_t as W,Yt as a,Vt as b,re as c,Dt as d,Zt as e,Tt as f,it as g,Z as h,ye as i,ae as j,tt as k,ne as l,$t as m,ee as n,ue as o,se as p,W as q,Et as r,Ft as s,fe as t,ie as u,Pt as v,J as w,oe as x,me as y,pe as z};
