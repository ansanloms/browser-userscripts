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

(()=>{var n=r=>{let t=document.querySelector("body");t&&new MutationObserver(r).observe(t,{childList:!0,subtree:!0})},o=n;var a;o(()=>{let r=new URL(location.href);if(r.pathname!=="/watch")return;let t=r.searchParams.get("v");if(a!==t&&document.querySelector("#player #error-screen:not([hidden])")){document.querySelector("#replace-player")?.remove();let e=document.createElement("iframe");e.id="replace-player",e.src=`https://www.youtube.com/embed/${t}?autoplay=1`,e.style.width="100%",e.style.aspectRatio="16 / 9",e.style.position="absolute",e.style.top=0,document.getElementById("player")?.appendChild(e),a=t}});})();
