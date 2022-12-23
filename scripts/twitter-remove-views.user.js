// ==UserScript==
// @name         Twitter: Remove views
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter の閲覧数を削除する。
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-remove-views.user.js
// ==/UserScript==

(() => {
  const mutationObserver = new MutationObserver(() => {
    [
      ...document.querySelectorAll(
        "[d='M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z']",
      ),
    ].forEach((node) => {
      const view = node.closest("div").parentNode;
      if (view) {
        view.remove();
      }
    });

    const viewLink = document.querySelector(
      "a[href$='/analytics']",
    );

    if (viewLink) {
      viewLink.remove();
    }
  });

  mutationObserver.observe(document.getElementById("react-root"), {
    childList: true,
    subtree: true,
  });
})();
