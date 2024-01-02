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

(()=>{let e=document.createElement("style");e.innerText=`
    /* \u30D7\u30EC\u30A4\u30E4\u306E\u30D8\u30C3\u30C0 */
    div.MainContainer-marquee,

    /* \u304B\u3093\u305F\u3093\u30B3\u30E1\u30F3\u30C8 */
    section.EasyCommentContainer,

    /* \u30B7\u30FC\u30AF\u30D0\u30FC\u306B\u51FA\u3066\u304F\u308B\u30D7\u30EC\u30DF\u30A2\u30E0\u6848\u5185 */
    div.SeekBarStoryboardPremiumLink,

    /* \u30D7\u30EC\u30A4\u30E4\u53F3\u306E\u5E83\u544A\u95A2\u9023\u306E\u8868\u793A */
    button.UadButton,
    div.UadButtonBalloon,

    /* \u30D7\u30EC\u30A4\u30E4\u53F3\u4E0B\u306E\u30AE\u30D5\u30C8\u95A2\u9023\u306E\u8868\u793A */
    div.GiftSubEffectContainer,

    /* \u9AD8\u753B\u8CEA\u3067\u52D5\u753B\u3092\u898B\u305F\u3044\u4E91\u3005\u306E\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7 */
    div.PreVideoStartPremiumLinkOnEconomyTimeContainer,

    /* \u3053\u306E\u52D5\u753B\u306F\u524D\u56DE\u9014\u4E2D\u307E\u3067\u4E91\u3005\u306E\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7 */
    div.PlayerOverlayBottomMessage.PreVideoStartPremiumLinkContainer,

    /* \u5E02\u5834\u76F4\u4E0A\u306E\u30CB\u30B3\u30CB\u5E83\u544A */
    div.UadVideosContainer,

    /* \u95A2\u9023\u30B3\u30F3\u30C6\u30F3\u30C4 */
    div.BottomSideContainer
    {
      display: none !important;
    }
  `,document.getElementsByTagName("head").item(0)?.appendChild(e)})();
