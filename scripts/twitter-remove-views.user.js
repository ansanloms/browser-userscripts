// ==UserScript==
// @name         Twitter: Remove views
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
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
        "a[href$='/analytics']",
      ),
    ].forEach((node) => {
      node.remove();
    });
  });

  mutationObserver.observe(document.getElementById("react-root"), {
    childList: true,
    subtree: true,
  });
})();
