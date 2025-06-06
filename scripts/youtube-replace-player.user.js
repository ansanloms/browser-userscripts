// ==UserScript==
// @name         YouTube: Replace player
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.5
// @description  YouTube プレイヤーの置き換え。
// @author       ansanloms
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// ==/UserScript==

(()=>{var a=r=>{let e=document.querySelector("body");e&&new MutationObserver(r).observe(e,{childList:!0,subtree:!0})},o=a;var n,i=r=>new Promise(e=>setTimeout(e,r));o(async()=>{let r=new URL(location.href);if(r.pathname!=="/watch")return;let e=r.searchParams.get("v");if(n!==e&&document.querySelector("#player #error-screen:not([hidden])")){document.querySelector("#replace-player")?.remove();let t=document.createElement("iframe");t.id="replace-player",t.src=`https://www.youtube.com/embed/${e}?autoplay=1`,t.style.width="100%",t.style.aspectRatio="16 / 9",t.style.position="absolute",t.style.top="0",document.getElementById("player")?.appendChild(t),e&&(n=e),await i(500),t.contentWindow?.location.reload()}});})();
