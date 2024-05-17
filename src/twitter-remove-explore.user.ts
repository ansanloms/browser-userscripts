// ==UserScript==
// @name         Twitter: Remove explore
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Twitter の「調べたいものを検索」を削除する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-explore.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-explore.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");

  style.innerText = `
    [aria-label="調べたいものを検索"],
    [aria-label="Search and explore"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0)?.appendChild(style);
})();
