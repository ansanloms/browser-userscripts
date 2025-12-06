// ==UserScript==
// @name         Twitter: Remove 'Who to follow'
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Twitter の「おすすめユーザー」を削除する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-who-to-follow.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-who-to-follow.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");

  style.innerText = `
    [aria-label="おすすめユーザー"],
    [aria-label="Who to follow"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0)?.appendChild(style);
})();

(() => {
  const mutationObserver = new MutationObserver(() => {
    const timelineElement = document.querySelector(
      "[aria-label^='Timeline: '][aria-label$='’s Tweets'] > div",
    ) || document.querySelector(
      "[aria-label^='タイムライン: '][aria-label$='さんのツイート'] > div",
    );

    if (!timelineElement) {
      return;
    }

    [...timelineElement.children].forEach((element, index) => {
      if (!(element instanceof HTMLElement)) {
        return;
      }

      if (element.style.display === "none") {
        return;
      }

      const h2 = element.querySelector("h2");
      if (
        h2 instanceof HTMLElement &&
        ["Who to follow", "おすすめユーザー"].find((text) =>
          text === h2.innerText.trim()
        )
      ) {
        element.style.display = "none";
        element.style.setProperty("display", "none", "important");
      }

      if (element.querySelector("[role='button'][aria-label^='Follow @']")) {
        element.style.display = "none";
        element.style.setProperty("display", "none", "important");
      }

      if (element.querySelector("[role='button'][aria-label^='フォロー @']")) {
        element.style.display = "none";
        element.style.setProperty("display", "none", "important");
      }

      const connectLink = element.querySelector("a[href^='/i/connect_people']");
      if (
        connectLink instanceof HTMLElement &&
        ["Show more", "さらに表示"].find((text) =>
          text === connectLink.innerText.trim()
        )
      ) {
        element.style.display = "none";
        element.style.setProperty("display", "none", "important");
      }
    });
  });

  const reactRoot = document.getElementById("react-root");
  if (reactRoot) {
    mutationObserver.observe(reactRoot, {
      childList: true,
      subtree: true,
    });
  }
})();
