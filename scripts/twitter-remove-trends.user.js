// ==UserScript==
// @name         Twitter: Remove trends
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter のトレンドを削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-trends.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-trends.user.js
// ==/UserScript==

(()=>{let e=document.createElement("style");e.type="text/css",e.innerText=`
    [aria-label="\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3: \u30C8\u30EC\u30F3\u30C9"],
    [aria-label="Timeline: Trending now"]
    {
      display: none !important;
    }
  `,document.getElementsByTagName("head").item(0)?.appendChild(e)})();
