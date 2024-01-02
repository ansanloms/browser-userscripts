// ==UserScript==
// @name         Twitter: Hide impression zombie
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Twitter のインプレゾンビを非表示する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// ==/UserScript==

new MutationObserver(()=>{let e=document.querySelector("[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']"),i=e?.querySelector("[data-testid='User-Name'] a")?.href?.split("/").at(-1).trim(),n=Number(e?.querySelector("[data-testid='reply']")?.getAttribute("aria-label")?.trim().match(/\d+/g)?.at(0)||"0"),o=Number(e?.querySelector("[data-testid='retweet']")?.getAttribute("aria-label")?.trim().match(/\d+/g)?.at(0)||"0"),l=Number(e?.querySelector("[data-testid='like']")?.getAttribute("aria-label")?.trim().match(/\d+/g)?.at(0)||"0");e&&document.querySelectorAll("[aria-label='Timeline: Conversation'] [data-testid='tweet']:not([tabindex='-1']):not([style='display: none;'])").forEach(t=>{let r=t.querySelector("[data-testid='User-Name'] a"),a=r?.href?.split("/").at(-1).trim();if(!(a&&i===a)){if(n>=100){t.style="display: none;";return}if(r?.querySelector("[data-testid='icon-verified']")){t.style="display: none;";return}if(/[\p{scx=Arabic}]+/u.test(r?.innerText||"")){t.style="display: none;";return}}})}).observe(document.getElementById("react-root"),{childList:!0,subtree:!0});
