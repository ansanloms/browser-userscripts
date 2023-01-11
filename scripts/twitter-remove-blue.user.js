// ==UserScript==
// @name         Twitter: Remove 'Twitter Blue'
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter Blue へのリンクを削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-blue.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.type = "text/css";

  style.innerText = `
    [aria-label="Twitter Blue"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0).appendChild(style);
})();
