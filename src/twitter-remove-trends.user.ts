// ==UserScript==
// @name         Twitter: Remove trends
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Twitter のトレンドを削除する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-trends.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-trends.user.js
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

  document.getElementsByTagName("head").item(0)?.appendChild(style);
})();
