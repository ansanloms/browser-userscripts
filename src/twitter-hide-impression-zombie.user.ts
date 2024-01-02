// ==UserScript==
// @name         Twitter: Hide impression zombie
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.2
// @description  Twitter のインプレゾンビを非表示する。
// @author       ansanloms
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// ==/UserScript==

(() => {
  const mutationObserver = new MutationObserver(() => {
    const currentTweet = document.querySelector(
      "[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']",
    );

    const currentTweetScreenname = currentTweet?.querySelector(
      "[data-testid='User-Name'] a",
    )?.href?.split("/").at(-1).trim();

    const reply = Number(
      currentTweet?.querySelector("[data-testid='reply']")?.getAttribute(
        "aria-label",
      )?.trim().match(/\d+/g)?.at(0) || "0",
    );

    const retweet = Number(
      currentTweet?.querySelector("[data-testid='retweet']")?.getAttribute(
        "aria-label",
      )?.trim().match(/\d+/g)?.at(0) || "0",
    );

    const like = Number(
      currentTweet?.querySelector("[data-testid='like']")?.getAttribute(
        "aria-label",
      )?.trim().match(/\d+/g)?.at(0) || "0",
    );

    console.log({ reply, retweet, like });

    if (currentTweet) {
      document.querySelectorAll(
        "[aria-label='Timeline: Conversation'] [data-testid='tweet']:not([tabindex='-1']):not([style='display: none;'])",
      ).forEach((elem) => {
        const userNameElem = elem.querySelector("[data-testid='User-Name'] a");

        const screenname = userNameElem?.href?.split(
          "/",
        ).at(-1).trim();

        // 返信元と返信先が同一アカウントなら表示。
        if (screenname && currentTweetScreenname === screenname) {
          return;
        }

        // バズってるツイートは非表示。
        if (reply >= 100 || retweet >= 300 || like >= 1000) {
          elem.style = "display: none;";
          return;
        }

        // 認証済アカは非表示。
        if (
          userNameElem?.querySelector("[data-testid='icon-verified']")
        ) {
          elem.style = "display: none;";
          return;
        }

        // ユーザ名にアラビア文字が含まれる場合は非表示。
        if (/[\p{scx=Arabic}]+/u.test(userNameElem?.innerText || "")) {
          elem.style = "display: none;";
          return;
        }
      });
    }
  });

  mutationObserver.observe(document.getElementById("react-root"), {
    childList: true,
    subtree: true,
  });
})();
