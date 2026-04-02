// ==UserScript==
// @name         Twitter: Get images
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter の画像を取得する。
// @author       ansanloms
// @match        https://x.com/*/media
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-get-images.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-get-images.user.js
// ==/UserScript==

(()=>{(()=>{let o=document.createElement("button");o.innerText="Get image",o.style.position="fixed",o.style.bottom="16px",o.style.left="16px",o.addEventListener("click",async()=>{let f=()=>{let t=globalThis.scrollY||globalThis.pageYOffset,e=document.documentElement.scrollHeight,n=globalThis.innerHeight;return Math.ceil(t+n)>=e},s=async t=>{await new Promise(e=>setTimeout(e,t))},r=t=>t.pathname.startsWith("/media/"),m=(t,e,n)=>(t.searchParams.set("format","png"),t.searchParams.set("name","4096x4096"),{name:`${e}-${n}-${t.pathname.split("/").at(-1)}.png`,url:t.toString()}),p=async t=>{let e=new Set,n=new Set,w=document.querySelectorAll(`a[href^='/${new URL(location.href).pathname.split("/").at(1)}/status']`);for(let l of[...w]){if(!(l instanceof HTMLAnchorElement))continue;let a=new URL(l.href||"https://example.com").pathname.split("/").at(3);if(a&&!t.has(a))if(n.add(a),l.querySelector("svg")){l.click(),await s(1e3);let c=[...document.querySelector("ul")?.querySelectorAll("li")||[]];for(let d of c){let i=document.querySelector("button[aria-label='Next slide']");i instanceof HTMLElement&&i.click(),await s(500)}c.forEach((d,i)=>{let h=new URL(d.querySelector("img")?.src||"https://example.com");r(h)&&e.add(m(h,a,i+1))});let g=document.querySelector("button[aria-label='Close']");g instanceof HTMLElement&&g.click(),await s(1e3)}else{let c=new URL(l.querySelector("img")?.src||"https://example.com");r(c)&&e.add(m(c,a,1))}}return{imageUrls:e,itemIds:n}},u=async(t=new Set)=>{let{imageUrls:e,itemIds:n}=await p(t);return f()?e:(globalThis.scrollTo({top:document.body.scrollHeight||document.documentElement.scrollHeight}),await s(2e3),e.union(await u(t.union(n))))};globalThis.scrollTo({top:0}),await s(1e3),console.log([...await u()].map(t=>`curl '${t.url}' -o ${t.name}`).join(`
`))}),document.querySelector("body")?.appendChild(o)})();})();
