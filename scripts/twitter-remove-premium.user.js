// ==UserScript==
// @name         Twitter: Remove 'Premium'
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Premium へのリンクを削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-premium.user.js
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-premium.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.type = "text/css";

  style.innerText = `
    [aria-label="Premium"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0).appendChild(style);
})();
