// ==UserScript==
// @name         General: Remove ads
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  広告リンクを削除する。
// @author       ansanloms
// @match        http*://*/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/general-remove-ads.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/general-remove-ads.user.js
// ==/UserScript==

(()=>{let e=document.createElement("style");e.innerText=`
    a[href*="popin.cc"],
    a[href*="news.nicovideo.jp"],
    a[href*="nxcount.com"],
    a[href*="speee-ad.jp"],
    a[href*="trendnews-digital.com"],
    a[href*="taboola.com"],
    a[href*="paeonia-beauty.info"],
    a[href*="gooddo.jp"],
    a[href*="shin-shouhin.com"],
    a[href*="abitus.info"],
    a[href*="oralcare-news.com"],
    a[href*="beauty-health.today"] {
      display: none !important;
    }
  `,document.getElementsByTagName("head").item(0)?.appendChild(e)})();
