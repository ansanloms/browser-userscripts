// ==UserScript==
// @name         YouTube: Replace player
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @author       ansanloms
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/youtube-replace-player.user.js
// ==/UserScript==

window.setTimeout(() => {
  const replacePlayer = () => {
    const newPlayer = document.createElement("iframe");
    newPlayer.src = `https://www.youtube.com/embed/${
      new URL(location.href).searchParams.get("v")
    }?autoplay=1`;
    newPlayer.style.width = "100%";
    newPlayer.style.aspectRatio = "16 / 9";

    document.getElementById("player").innerHTML = "";
    document.getElementById("player").appendChild(newPlayer);
  };

  const mutationObserver = new MutationObserver(replacePlayer);
  mutationObserver.observe(
    document.querySelector("#title.ytd-watch-metadata"),
    {
      childList: true,
      subtree: true,
    },
  );

  replacePlayer();
}, 1000);
