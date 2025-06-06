// ==UserScript==
// @name         YouTube: Replace player
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.6
// @description  YouTube プレイヤーの置き換え。
// @author       ansanloms
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// ==/UserScript==

import mutation from "./utils/mutation.ts";

let prevId: string;

const sleep = (time: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, time));

mutation(async () => {
  const url = new URL(location.href);

  if (url.pathname !== "/watch") {
    return;
  }

  const id = url.searchParams.get("v");
  if (prevId === id) {
    return;
  }

  if (
    document.querySelector("#player #error-screen:not([hidden])")
  ) {
    document.querySelector("#replace-player")?.remove();

    const newPlayer = document.createElement("iframe");
    newPlayer.id = "replace-player";
    newPlayer.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    newPlayer.style.width = "100%";
    newPlayer.style.aspectRatio = "16 / 9";
    newPlayer.style.position = "absolute";
    newPlayer.style.top = "0";

    document.getElementById("player")?.appendChild(newPlayer);
    if (id) {
      prevId = id;
    }

    await sleep(500);
    newPlayer.contentWindow?.location.reload();
  }
});
