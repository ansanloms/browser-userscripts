// ==UserScript==
// @name         YouTube: Replace player
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.4
// @description  YouTube プレイヤーの置き換え。
// @author       ansanloms
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// ==/UserScript==

(()=>{var o=r=>{let e=document.querySelector("body");e&&new MutationObserver(r).observe(e,{childList:!0,subtree:!0})},n=o;var a;n(()=>{let r=new URL(location.href);if(r.pathname!=="/watch")return;let e=r.searchParams.get("v");if(a!==e&&e&&document.querySelector("#player #error-screen,#replace-player")){let t=document.createElement("iframe");t.id="replace-player",t.src=`https://www.youtube.com/embed/${e}?autoplay=1`,t.style.width="100%",t.style.aspectRatio="16 / 9",document.getElementById("player").innerHTML="",document.getElementById("player")?.appendChild(t),a=e}});})();
