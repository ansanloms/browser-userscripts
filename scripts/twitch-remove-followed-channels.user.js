// ==UserScript==
// @name         Twitch: Remove 'Followed Channels'
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  「おすすめのチャンネル」リンクを削除する。
// @author       ansanloms
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.twitch.tv
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitch-remove-followed-channels.user.js
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitch-remove-followed-channels.user.js
// ==/UserScript==

(()=>{(()=>{let e=document.createElement("style");e.innerText=`
    [aria-label="Followed Channels"],
    [aria-label$="Viewers Also Watch"],
    [aria-label="\u304A\u3059\u3059\u3081\u306E\u30C1\u30E3\u30F3\u30CD\u30EB"],
    [aria-label$="\u3055\u3093\u306E\u8996\u8074\u8005\u304C\u8996\u8074"]
    {
      display: none !important;
    }
  `,document.getElementsByTagName("head").item(0)?.appendChild(e)})();})();
