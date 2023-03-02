// ==UserScript==
// @name         Twitter: Remove ads
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Twitter のプロモツイートを削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-ads.user.js
// ==/UserScript==

(() => {
  const mutationObserver = new MutationObserver(() => {
    [
      ...document.querySelectorAll(
        "[d='M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12h-2v-3.59l-5.293 5.3-1.414-1.42L12.581 10H8.996V8h7v7z']",
      ),
    ].forEach((node) => {
      const article = node.closest("article");
      if (article) {
        article.style = "display: none;";
      }
    });
  });

  mutationObserver.observe(document.getElementById("react-root"), {
    childList: true,
    subtree: true,
  });
})();
