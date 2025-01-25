// ==UserScript==
// @name         Twitter: Remove explore
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Twitter の左メニューを削除する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-navigation.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-navigation.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");

  style.innerText = `
    [aria-label="調べたいものを検索"],
    [aria-label="Search and explore"],
    [aria-label="Grok"],
    [aria-label="求人"],
    [aria-label="Jobs"],
    [aria-label="プレミアム"],
    [aria-label="Premium"],
    [aria-label="認証済み組織"],
    [aria-label="Verified Orgs"]
    [aria-label="ビジネス"],
    [aria-label="Business"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0)?.appendChild(style);
})();
