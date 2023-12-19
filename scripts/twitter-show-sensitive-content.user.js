// ==UserScript==
// @name         Twitter: Show sensitive content
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.3
// @description  Twitter のセンシティブコンテンツを表示する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-show-sensitive-content.user.js
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-show-sensitive-content.user.js
// ==/UserScript==

(() => {
  const mutationObserver = new MutationObserver(() => {
    document.querySelectorAll("[data-testid='tweet'] [role='button']").forEach(
      (elem) => {
        if (elem.innerText === "Show") {
          elem.click();
        }
      },
    );

    if (new URL(location.href).pathname.endsWith("/media")) {
      document.querySelectorAll("div").forEach((elem) => {
        if (
          elem.innerText.indexOf("Warning:") === 0 && elem.nextElementSibling &&
          elem.nextElementSibling.innerText === "Show"
        ) {
          elem.nextElementSibling.click();
        }
      });
    }
  });

  mutationObserver.observe(document.getElementById("react-root"), {
    childList: true,
    subtree: true,
  });
})();
