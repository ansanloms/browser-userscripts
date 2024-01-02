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

window.addEventListener("load",o=>{let r,a=()=>{let n=new URL(location.href);if(n.pathname!=="/watch")return;let t=n.searchParams.get("v");if(r!==t&&document.querySelector("#player #error-screen,#replace-player")){let e=document.createElement("iframe");e.id="replace-player",e.src=`https://www.youtube.com/embed/${t}?autoplay=1`,e.style.width="100%",e.style.aspectRatio="16 / 9",document.getElementById("player").innerHTML="",document.getElementById("player")?.appendChild(e),r=t||""}};new MutationObserver(a).observe(document.querySelector("body"),{childList:!0,subtree:!0})});
