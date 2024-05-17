// ==UserScript==
// @name         Twitter: Hide impression zombie
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.3
// @description  Twitter のインプレゾンビを非表示する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// ==/UserScript==

(()=>{var s=e=>{let t=document.querySelector("body");t&&new MutationObserver(e).observe(t,{childList:!0,subtree:!0})},i=s;var o=e=>{let t=e.closest("[data-testid='cellInnerDiv']");t&&(t.style="display: none;"),e.style="display: none;"};i(()=>{let e=document.querySelector("[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']"),t=e?.querySelector("[data-testid='User-Name'] a")?.href?.split("/").at(-1).trim();e&&document.querySelectorAll("[aria-label='Timeline: Conversation'] [data-testid='tweet']:not([tabindex='-1']):not([style='display: none;'])").forEach(r=>{let n=r.querySelector("[data-testid='User-Name'] a"),a=n?.href?.split("/").at(-1).trim();if(!(a&&t===a)){if(n?.querySelector("[data-testid='icon-verified']")){o(r);return}if(/[\p{scx=Arabic}]+/u.test(n?.innerText||"")){o(r);return}}})});})();
