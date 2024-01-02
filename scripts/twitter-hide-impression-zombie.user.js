// ==UserScript==
// @name         Twitter: Hide impression zombie.
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter のインプレゾンビを非表示する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// ==/UserScript==

new MutationObserver(()=>{let r=document.querySelector("[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']"),a=r?.querySelector("[data-testid='User-Name'] a")?.href?.split("/").at(-1).trim();r&&document.querySelectorAll("[aria-label='Timeline: Conversation'] [data-testid='tweet']:not([tabindex='-1']):not([style='display: none;'])").forEach(e=>{let t=e.querySelector("[data-testid='User-Name'] a"),n=t?.href?.split("/").at(-1).trim();n&&a===n||(t?.querySelector("[data-testid='icon-verified']")&&(e.style="display: none;"),/[\p{scx=Arabic}]+/u.test(t?.innerText||"")&&(e.style="display: none;"))})}).observe(document.getElementById("react-root"),{childList:!0,subtree:!0});
