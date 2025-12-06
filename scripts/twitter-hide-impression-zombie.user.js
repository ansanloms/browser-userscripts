// ==UserScript==
// @name         Twitter: Hide impression zombie
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.4
// @description  Twitter のインプレゾンビを非表示する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// ==/UserScript==

(()=>{var b=t=>{let e=document.querySelector("body");e&&new MutationObserver(t).observe(e,{childList:!0,subtree:!0})},u=b;var p=t=>{let e=t.closest("[data-testid='cellInnerDiv']");e instanceof HTMLElement&&(e.style.display="none"),t instanceof HTMLElement&&(t.style.display="none")},y=({count:t,isVerified:e,isArabic:s,isJapanese:o})=>!!(s||e&&!o||e&&t>=2);u(()=>{let t=document.querySelector("[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']"),e=t?.querySelector("[data-testid='User-Name'] a"),s=e instanceof HTMLAnchorElement?e.href?.split("/").at(-1)?.trim()??"":"";if(t){let o=Array.from(document.querySelectorAll("[aria-label='Timeline: Conversation'] [data-testid='tweet']:not([tabindex='-1']):not([style='display: none;'])")),c=new Map;o.forEach(i=>{let n=i.querySelector("[data-testid='User-Name'] a");if(!(n instanceof HTMLAnchorElement))return;let r=n.href?.split("/").at(-1)?.trim()??"",a=n.innerText,l=!!n.querySelector("[data-testid='icon-verified']"),m=/[\p{scx=Arabic}]+/u.test(a??""),d=/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(a??""),f=c.get(r);c.set(r,{count:(f?.count??0)+1,isVerified:l,isArabic:m,isJapanese:d})}),o.forEach(i=>{let n=i.querySelector("[data-testid='User-Name'] a");if(!(n instanceof HTMLAnchorElement))return;let r=n.href?.split("/").at(-1)?.trim()??"";if(s===r)return;let a=c.get(r);if(a&&y(a)){p(i);return}})}});})();
