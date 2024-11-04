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

(() => {
  const style = document.createElement("style");

  style.innerText = `
    [aria-label="Followed Channels"],
    [aria-label$="Viewers Also Watch"],
    [aria-label="おすすめのチャンネル"],
    [aria-label$="さんの視聴者が視聴"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0)?.appendChild(style);
})();
