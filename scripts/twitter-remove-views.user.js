// ==UserScript==
// @name         Twitter: Remove views
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.3
// @description  Twitter の閲覧数を削除する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-views.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-views.user.js
// ==/UserScript==

(()=>{new MutationObserver(()=>{[...document.querySelectorAll("a[href$='/analytics']")].forEach(e=>{e.remove()})}).observe(document.getElementById("react-root"),{childList:!0,subtree:!0});})();
