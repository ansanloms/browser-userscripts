// ==UserScript==
// @name         Niconico: clean player
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  ニコニコのプレイヤから不要なものを削除する。
// @author       ansanloms
// @match        https://www.nicovideo.jp/watch*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/niconico-clean-player.user.js
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.type = "text/css";

  style.innerText = `
    /* プレイヤのヘッダ */
    div.MainContainer-marquee,

    /* かんたんコメント */
    section.EasyCommentContainer,

    /* シークバーに出てくるプレミアム案内 */
    div.SeekBarStoryboardPremiumLink,

    /* プレイヤ右の広告関連の表示 */
    button.UadButton,
    div.UadButtonBalloon,

    /* プレイヤ右下のギフト関連の表示 */
    div.GiftSubEffectContainer,

    /* 高画質で動画を見たい云々のポップアップ */
    div.PreVideoStartPremiumLinkOnEconomyTimeContainer,

    /* この動画は前回途中まで云々のポップアップ */
    div.PlayerOverlayBottomMessage.PreVideoStartPremiumLinkContainer,

    /* 市場直上のニコニ広告 */
    div.UadVideosContainer,

    /* 関連コンテンツ */
    div.BottomSideContainer
    {
      display: none !important;
    }
  `;

  document.getElementsByTagName("head").item(0).appendChild(style);
})();
