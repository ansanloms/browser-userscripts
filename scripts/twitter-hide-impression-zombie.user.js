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

(()=>{var y=t=>{let e=document.querySelector("body");e&&new MutationObserver(t).observe(e,{childList:!0,subtree:!0})},u=y;var E=t=>{let e=t.closest("[data-testid='cellInnerDiv']");e instanceof HTMLElement&&(e.style.display="none"),t instanceof HTMLElement&&(t.style.display="none")},h=({count:t,isVerified:e,isArabic:s,isJapanese:a,isEmojiOnly:i})=>!!(s||i||e&&!a||e&&t>=2);u(()=>{let t=document.querySelector("[aria-label='Timeline: Conversation'] [data-testid='tweet'][tabindex='-1']"),e=t?.querySelector("[data-testid='User-Name'] a"),s=e instanceof HTMLAnchorElement?e.href?.split("/").at(-1)?.trim()??"":"";if(t){let a=Array.from(document.querySelectorAll("[aria-label='Timeline: Conversation'] [data-testid='tweet']:not([tabindex='-1']):not([style='display: none;'])")),i=new Map;a.forEach(c=>{let n=c.querySelector("[data-testid='User-Name'] a");if(!(n instanceof HTMLAnchorElement))return;let o=n.href?.split("/").at(-1)?.trim()??"",r=n.innerText,m=!!n.querySelector("[data-testid='icon-verified']"),f=/[\p{scx=Arabic}]+/u.test(r??""),d=/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(r??""),b=(r??"").replace(/[\p{Emoji}\s]/gu,""),p=(r??"").trim().length>0&&b.length===0,l=i.get(o);i.set(o,{count:(l?.count??0)+1,isVerified:m,isArabic:f,isJapanese:d,isEmojiOnly:p||(l?.isEmojiOnly??!1)})}),a.forEach(c=>{let n=c.querySelector("[data-testid='User-Name'] a");if(!(n instanceof HTMLAnchorElement))return;let o=n.href?.split("/").at(-1)?.trim()??"";if(s===o)return;let r=i.get(o);if(r&&h(r)){E(c);return}})}});})();
