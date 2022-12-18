// ==UserScript==
// @name         Twitter: Remove 'Who to follow'.
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter: Remove 'Who to follow'.
// @author       ansanloms
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.type = "text/css";

  style.innerText = `
    [aria-label="おすすめユーザー"],
    [aria-label="Who to follow"]
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0).appendChild(style);
})();

(() => {
  const resizeObserver = new ResizeObserver(() => {
    const timelineElement = document.querySelector(
      "[aria-label^='Timeline: '][aria-label$='’s Tweets'] > div",
    ) || document.querySelector(
      "[aria-label^='タイムライン: '][aria-label$='さんのツイート'] > div",
    );

    if (!timelineElement) {
      return;
    }

    [...timelineElement.children].forEach((element, index) => {
      if (element.style === "display: none !important;") {
        return;
      }

      if (
        element.querySelector("h2") &&
        ["Who to follow", "おすすめユーザー"].find((text) =>
          text === element.querySelector("h2").innerText.trim()
        )
      ) {
        element.style = "display: none !important;";
      }

      if (element.querySelector("[role='button'][aria-label^='Follow @']")) {
        element.style = "display: none !important;";
      }

      if (element.querySelector("[role='button'][aria-label^='フォロー @']")) {
        element.style = "display: none !important;";
      }

      if (
        element.querySelector("a[href^='/i/connect_people']") &&
        ["Show more", "さらに表示"].find((text) =>
          text ===
            element.querySelector("a[href^='/i/connect_people']").innerText
              .trim()
        )
      ) {
        element.style = "display: none !important;";
      }
    });
  });

  const mutationObserver = new MutationObserver(() => {
    const timelineElement =
      document.querySelector("[aria-label='Home timeline']") ||
      document.querySelector("[aria-label='ホームタイムライン']");

    if (timelineElement) {
      resizeObserver.observe(timelineElement);
      mutationObserver.disconnect();
    }
  });

  mutationObserver.observe(document, {
    childList: true,
    subtree: true,
  });
})();
