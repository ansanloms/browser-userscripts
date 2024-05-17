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

(()=>{(()=>{let e=document.createElement("style");e.innerText=`
    [aria-label="\u8ABF\u3079\u305F\u3044\u3082\u306E\u3092\u691C\u7D22"],
    [aria-label="Search and explore"]
    {
      display: none !important;
    }
  `,document.getElementsByTagName("head").item(0)?.appendChild(e)})();})();
