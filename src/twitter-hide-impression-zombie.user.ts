// ==UserScript==
// @name         Twitter: Hide impression zombie
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.4
// @description  Twitter のインプレゾンビを非表示する。
// @author       ansanloms
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-hide-impression-zombie.user.js
// ==/UserScript==

import mutation from "./utils/mutation.ts";

const hideTweet = (elem: Element) => {
  const parentElem = elem.closest("[data-testid='cellInnerDiv']");
  if (parentElem instanceof HTMLElement) {
    parentElem.style.display = "none";
  }
  if (elem instanceof HTMLElement) {
    elem.style.display = "none";
  }
};

const isImpressionZombie = ({ count, isVerified, isArabic, isJapanese }: {
  count: number;
  isVerified: boolean;
  isArabic: boolean;
  isJapanese: boolean;
}) => {
  if (isArabic) {
    return true;
  }

  if (isVerified && !isJapanese) {
    return true;
  }

  if (isVerified && count >= 2) {
    return true;
  }

  return false;
};

mutation(() => {
  const currentTweet = document.querySelector(
    "[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']",
  );

  const currentTweetUsernameElem = currentTweet?.querySelector(
    "[data-testid='User-Name'] a",
  );
  const currentTweetScreenname = currentTweetUsernameElem instanceof HTMLAnchorElement
    ? currentTweetUsernameElem.href?.split("/").at(-1)?.trim() ?? ""
    : "";

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
    const tweets = Array.from(
      document.querySelectorAll(
        "[aria-label='Timeline: Conversation'] [data-testid='tweet']:not([tabindex='-1']):not([style='display: none;'])",
      ),
    );

    const userReply = new Map<
      string,
      {
        count: number;
        isVerified: boolean;
        isArabic: boolean;
        isJapanese: boolean;
      }
    >();

    tweets.forEach((elem) => {
      const usernameElem = elem.querySelector("[data-testid='User-Name'] a");

      if (!(usernameElem instanceof HTMLAnchorElement)) {
        return;
      }

      const screenname = usernameElem.href?.split("/").at(-1)?.trim() ?? "";
      const username = usernameElem.innerText;

      // 認証済か？
      const isVerified = !!usernameElem.querySelector(
        "[data-testid='icon-verified']",
      );

      // ユーザ名にアラビア文字が含まれるか？
      const isArabic = /[\p{scx=Arabic}]+/u.test(username ?? "");

      // ユーザ名に日本語が含まれているか？。
      const isJapanese =
        /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(
          username ?? "",
        );

      const current = userReply.get(screenname);

      userReply.set(screenname, {
        count: (current?.count ?? 0) + 1,
        isVerified,
        isArabic,
        isJapanese,
      });
    });

    tweets.forEach((elem) => {
      const usernameElem = elem.querySelector("[data-testid='User-Name'] a");

      if (!(usernameElem instanceof HTMLAnchorElement)) {
        return;
      }

      const screenname = usernameElem.href?.split("/").at(-1)?.trim() ?? "";

      // 返信元と返信先が同一アカウントなら表示。
      if (currentTweetScreenname === screenname) {
        return;
      }

      // インプレゾンビは非表示。
      const current = userReply.get(screenname);
      if (current && isImpressionZombie(current)) {
        hideTweet(elem);
        return;
      }
    });
  }
});
