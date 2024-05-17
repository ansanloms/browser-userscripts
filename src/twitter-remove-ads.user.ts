// ==UserScript==
// @name         Twitter: Remove ads
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.4
// @description  Twitter のプロモツイートを削除する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-ads.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-ads.user.js
// ==/UserScript==

(() => {
  const mutationObserver = new MutationObserver(() => {
    document.querySelectorAll("[data-testid='tweet']").forEach((tweet) => {
      if (
        tweet.style !== "display: none;" &&
        Array.from(tweet.querySelectorAll("span")).some((v) =>
          v.innerText === "Ad"
        )
      ) {
        tweet.style = "display: none;";
      }
    });
  });

  mutationObserver.observe(document.getElementById("react-root"), {
    childList: true,
    subtree: true,
  });
})();
