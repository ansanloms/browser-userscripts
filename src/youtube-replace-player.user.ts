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

import mutation from "./utils/mutation.ts";

let id: string;

mutation(() => {
  const url = new URL(location.href);

  if (url.pathname !== "/watch") {
    return;
  }

  const newId = url.searchParams.get("v");
  if (id === newId) {
    return;
  }

  if (
    newId && document.querySelector("#player #error-screen,#replace-player")
  ) {
    const newPlayer = document.createElement("iframe");
    newPlayer.id = "replace-player";
    newPlayer.src = `https://www.youtube.com/embed/${newId}?autoplay=1`;
    newPlayer.style.width = "100%";
    newPlayer.style.aspectRatio = "16 / 9";

    document.getElementById("player")!.innerHTML = "";
    document.getElementById("player")?.appendChild(newPlayer);

    id = newId;
  }
});
