// ==UserScript==
// @name         YouTube: Remove Short
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  YouTube ショートを非表示にする。
// @author       ansanloms
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-remove-short.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.type = "text/css";

  style.innerText = `
    ytd-reel-shelf-renderer {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0).appendChild(style);
})();
