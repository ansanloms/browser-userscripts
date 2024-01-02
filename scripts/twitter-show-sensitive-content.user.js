// ==UserScript==
// @name         Twitter: Show sensitive content
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.3
// @description  Twitter のセンシティブコンテンツを表示する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-show-sensitive-content.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-show-sensitive-content.user.js
// ==/UserScript==

new MutationObserver(()=>{document.querySelectorAll("[data-testid='tweet'] [role='button']").forEach(e=>{e.innerText==="Show"&&e.click()}),new URL(location.href).pathname.endsWith("/media")&&document.querySelectorAll("div").forEach(e=>{e.innerText.indexOf("Warning:")===0&&e.nextElementSibling&&e.nextElementSibling.innerText==="Show"&&e.nextElementSibling.click()})}).observe(document.getElementById("react-root"),{childList:!0,subtree:!0});
