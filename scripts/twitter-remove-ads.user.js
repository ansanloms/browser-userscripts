// ==UserScript==
// @name         Twitter: Remove ads
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.3
// @description  Twitter のプロモツイートを削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-ads.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-ads.user.js
// ==/UserScript==

(()=>{new MutationObserver(()=>{document.querySelectorAll("[data-testid='tweet']").forEach(e=>{e.style!=="display: none;"&&Array.from(e.querySelectorAll("span")).some(t=>t.innerText==="Ad")&&(e.style="display: none;")})}).observe(document.getElementById("react-root"),{childList:!0,subtree:!0});})();
