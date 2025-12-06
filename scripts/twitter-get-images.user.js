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

(()=>{(()=>{let o=document.createElement("button");o.innerText="Get image",o.style.position="fixed",o.style.bottom="16px",o.style.left="16px",o.addEventListener("click",async()=>{let f=()=>{let t=window.scrollY||window.pageYOffset,e=document.documentElement.scrollHeight,n=window.innerHeight;return Math.ceil(t+n)>=e},s=async t=>{await new Promise(e=>setTimeout(e,t))},l=t=>t.pathname.startsWith("/media/"),m=(t,e,n)=>(t.searchParams.set("format","png"),t.searchParams.set("name","4096x4096"),{name:`${e}-${n}-${t.pathname.split("/").at(-1)}.png`,url:t.toString()}),p=async t=>{let e=new Set,n=new Set,h=document.querySelectorAll(`a[href^='/${new URL(location.href).pathname.split("/").at(1)}/status']`);for(let c of[...h]){if(!(c instanceof HTMLAnchorElement))continue;let i=new URL(c.href||"https://example.com").pathname.split("/").at(3);if(i&&!t.has(i))if(n.add(i),c.querySelector("svg")){c.click(),await s(1e3);let a=[...document.querySelector("ul")?.querySelectorAll("li")||[]];for(let g of a){let r=document.querySelector("button[aria-label='Next slide']");r instanceof HTMLElement&&r.click(),await s(500)}a.forEach((g,r)=>{let w=new URL(g.querySelector("img")?.src||"https://example.com");l(w)&&e.add(m(w,i,r+1))});let d=document.querySelector("button[aria-label='Close']");d instanceof HTMLElement&&d.click(),await s(1e3)}else{let a=new URL(c.querySelector("img")?.src||"https://example.com");l(a)&&e.add(m(a,i,1))}}return{imageUrls:e,itemIds:n}},u=async(t=new Set)=>{let{imageUrls:e,itemIds:n}=await p(t);return f()?e:(window.scrollTo({top:document.body.scrollHeight||document.documentElement.scrollHeight}),await s(2e3),e.union(await u(t.union(n))))};window.scrollTo({top:0}),await s(1e3),console.log([...await u()].map(t=>`curl '${t.url}' -o ${t.name}`).join(`
`))}),document.querySelector("body")?.appendChild(o)})();})();
