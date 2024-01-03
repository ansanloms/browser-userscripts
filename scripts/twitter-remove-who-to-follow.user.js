// ==UserScript==
// @name         Twitter: Remove 'Who to follow'
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter の「おすすめユーザー」を削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-who-to-follow.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-who-to-follow.user.js
// ==/UserScript==

(()=>{(()=>{let t=document.createElement("style");t.innerText=`
    [aria-label="\u304A\u3059\u3059\u3081\u30E6\u30FC\u30B6\u30FC"],
    [aria-label="Who to follow"]
    {
      display: none !important;
    }
  `,document.getElementsByTagName("head").item(0)?.appendChild(t)})();new MutationObserver(()=>{let o=document.querySelector("[aria-label^='Timeline: '][aria-label$='\u2019s Tweets'] > div")||document.querySelector("[aria-label^='\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3: '][aria-label$='\u3055\u3093\u306E\u30C4\u30A4\u30FC\u30C8'] > div");o&&[...o.children].forEach((e,i)=>{e.style!=="display: none !important;"&&(e.querySelector("h2")&&["Who to follow","\u304A\u3059\u3059\u3081\u30E6\u30FC\u30B6\u30FC"].find(r=>r===e.querySelector("h2")?.innerText.trim())&&(e.style="display: none !important;"),e.querySelector("[role='button'][aria-label^='Follow @']")&&(e.style="display: none !important;"),e.querySelector("[role='button'][aria-label^='\u30D5\u30A9\u30ED\u30FC @']")&&(e.style="display: none !important;"),e.querySelector("a[href^='/i/connect_people']")&&["Show more","\u3055\u3089\u306B\u8868\u793A"].find(r=>r===e.querySelector("a[href^='/i/connect_people']")?.innerText.trim())&&(e.style="display: none !important;"))})}).observe(document.getElementById("react-root"),{childList:!0,subtree:!0});})();
