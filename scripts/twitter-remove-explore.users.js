// ==UserScript==
// @name         Twitter: Remove explore.
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter: Remove explore.
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
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
