// ==UserScript==
// @name         Twitter: Remove trends.
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter: Remove trends.
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.type = "text/css";

  style.innerText = `
    [aria-label="タイムライン: トレンド"],
    [aria-label="Timeline: Trending now"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0).appendChild(style);
})();
