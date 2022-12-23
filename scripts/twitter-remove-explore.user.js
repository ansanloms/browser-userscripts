// ==UserScript==
// @name         Twitter: Remove explore
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter の「調べたいものを検索」を削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-explore.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.type = "text/css";

  style.innerText = `
    [aria-label="調べたいものを検索"],
    [aria-label="Search and explore"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0).appendChild(style);
})();
