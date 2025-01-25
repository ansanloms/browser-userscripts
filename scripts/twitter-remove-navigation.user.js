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

(()=>{(()=>{let a=document.createElement("style");a.innerText=`
    [aria-label="\u8ABF\u3079\u305F\u3044\u3082\u306E\u3092\u691C\u7D22"],
    [aria-label="Search and explore"],
    [aria-label="Grok"],
    [aria-label="\u6C42\u4EBA"],
    [aria-label="Jobs"],
    [aria-label="\u30D7\u30EC\u30DF\u30A2\u30E0"],
    [aria-label="Premium"],
    [aria-label="\u8A8D\u8A3C\u6E08\u307F\u7D44\u7E54"],
    [aria-label="Verified Orgs"]
    [aria-label="\u30D3\u30B8\u30CD\u30B9"],
    [aria-label="Business"]
    {
      display: none !important;
    }
  `,document.getElementsByTagName("head").item(0)?.appendChild(a)})();})();
