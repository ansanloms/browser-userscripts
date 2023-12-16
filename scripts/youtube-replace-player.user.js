// ==UserScript==
// @name         YouTube: Replace player
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @description  YouTube プレイヤーの置き換え。
// @version      0.0.3
// @author       ansanloms
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// ==/UserScript==

window.addEventListener("load", (event) => {
  let id;

  const replacePlayer = () => {
    const url = new URL(location.href);

    if (url.pathname !== "/watch") {
      return;
    }

    const newId = url.searchParams.get("v");
    if (id === newId) {
      return;
    }
    id = newId;

    const newPlayer = document.createElement("iframe");
    newPlayer.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    newPlayer.style.width = "100%";
    newPlayer.style.aspectRatio = "16 / 9";

    document.getElementById("player").innerHTML = "";
    document.getElementById("player").appendChild(newPlayer);
  };

  const mutationObserver = new MutationObserver(replacePlayer);
  mutationObserver.observe(
    document.querySelector("body"),
    {
      childList: true,
      subtree: true,
    },
  );
});
