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

import mutation from "./utils/mutation.ts";

const hideTweet = (elem: Element) => {
  const parentElem = elem.closest("[data-testid='cellInnerDiv']");
  if (parentElem) {
    parentElem.style = "display: none;";
  }
  elem.style = "display: none;";
};

mutation(() => {
  const currentTweet = document.querySelector(
    "[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']",
  );

  const currentTweetScreenname = currentTweet?.querySelector(
    "[data-testid='User-Name'] a",
  )?.href?.split("/").at(-1).trim();

  //const reply = Number(
  //  currentTweet?.querySelector("[data-testid='reply']")?.getAttribute(
  //    "aria-label",
  //  )?.trim().match(/\d+/g)?.at(0) || "0",
  //);

  //const retweet = Number(
  //  currentTweet?.querySelector("[data-testid='retweet']")?.getAttribute(
  //    "aria-label",
  //  )?.trim().match(/\d+/g)?.at(0) || "0",
  //);

  //const like = Number(
  //  currentTweet?.querySelector("[data-testid='like']")?.getAttribute(
  //    "aria-label",
  //  )?.trim().match(/\d+/g)?.at(0) || "0",
  //);

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

      // 認証済アカは非表示。
      if (
        userNameElem?.querySelector("[data-testid='icon-verified']")
      ) {
        hideTweet(elem);
        return;
      }

      // ユーザ名にアラビア文字が含まれる場合は非表示。
      if (/[\p{scx=Arabic}]+/u.test(userNameElem?.innerText || "")) {
        hideTweet(elem);
        return;
      }
    });
  }
});
