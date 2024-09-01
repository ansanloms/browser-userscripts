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

(()=>{(()=>{let o=document.createElement("button");o.innerText="Get image",o.style.position="fixed",o.style.bottom="16px",o.style.left="16px",o.addEventListener("click",async()=>{let g=()=>{let e=window.scrollY||window.pageYOffset,t=document.documentElement.scrollHeight,n=window.innerHeight;return Math.ceil(e+n)>=t},s=async e=>{await new Promise(t=>setTimeout(t,e))},i=e=>e.pathname.startsWith("/media/"),l=(e,t,n)=>(e.searchParams.set("format","png"),e.searchParams.set("name","4096x4096"),{name:`${t}-${n}-${e.pathname.split("/").at(-1)}.png`,url:e.toString()}),w=async e=>{let t=new Set,n=new Set,p=document.querySelectorAll(`a[href^='/${new URL(location.href).pathname.split("/").at(1)}/status']`);for(let r of[...p]){let a=new URL(r.href||"https://example.com").pathname.split("/").at(3);if(a&&!e.has(a))if(n.add(a),r.querySelector("svg")){r.click(),await s(1e3);let c=[...document.querySelector("ul")?.querySelectorAll("li")||[]];for(let u of c)document.querySelector("button[aria-label='Next slide']")?.click(),await s(500);c.forEach((u,h)=>{let d=new URL(u.querySelector("img")?.src||"https://example.com");i(d)&&t.add(l(d,a,h+1))}),document.querySelector("button[aria-label='Close']")?.click(),await s(1e3)}else{let c=new URL(r.querySelector("img")?.src||"https://example.com");i(c)&&t.add(l(c,a,1))}}return{imageUrls:t,itemIds:n}},m=async(e=new Set)=>{let{imageUrls:t,itemIds:n}=await w(e);return g()?t:(window.scrollTo({top:document.body.scrollHeight||document.documentElement.scrollHeight}),await s(2e3),t.union(await m(e.union(n))))};window.scrollTo({top:0}),await s(1e3),console.log([...await m()].map(e=>`curl '${e.url}' -o ${e.name}`).join(`
`))}),document.querySelector("body")?.appendChild(o)})();})();
