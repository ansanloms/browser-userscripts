// ==UserScript==
// @name         Twitter: Get images
// @namespace    https://github.com/ansanloms/tampermonkey-scripts
// @version      0.0.1
// @description  Twitter の画像を取得する。
// @author       ansanloms
// @match        https://x.com/*/media
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-get-images.user.js
// @updateURL    https://raw.githubusercontent.com/ansanloms/tampermonkey-scripts/main/scripts/twitter-get-images.user.js
// ==/UserScript==

(() => {
  const button = document.createElement("button");
  button.innerText = "Get image";
  button.style.position = "fixed";
  button.style.bottom = "16px";
  button.style.left = "16px";

  button.addEventListener("click", async () => {
    const isEndOfPage = () => {
      // 現在のスクロール位置
      const scrollTop = window.scrollY || window.pageYOffset;
      // ドキュメント全体の高さ
      const documentHeight = document.documentElement.scrollHeight;
      // ビューポートの高さ
      const windowHeight = window.innerHeight;

      // ページの末尾にいるかどうかを判定
      return Math.ceil(scrollTop + windowHeight) >= documentHeight;
    };

    const sleep = async (t: number) => {
      await new Promise((resolve) => setTimeout(resolve, t));
    };

    const isImageUrl = (url: URL) => {
      return url.pathname.startsWith("/media/");
    };

    const getUrlObject = (url: URL, itemId: string, index: number) => {
      url.searchParams.set("format", "png");
      url.searchParams.set("name", "4096x4096");

      return {
        name: `${itemId}-${index}-${url.pathname.split("/").at(-1)}.png`,
        url: url.toString(),
      };
    };

    const getImageUrls = async (ignoreItemIds: Set<string>) => {
      const imageUrls = new Set<{ name: string; url: string }>();
      const itemIds = new Set<string>();

      const items = document.querySelectorAll(
        `a[href^='/${
          new URL(location.href).pathname.split("/").at(1)
        }/status']`,
      );

      for (const item of [...items]) {
        const itemId = (new URL(item.href || "https://example.com")).pathname
          .split("/").at(3);
        if (!itemId) {
          continue;
        }

        if (ignoreItemIds.has(itemId)) {
          continue;
        }

        itemIds.add(itemId);

        if (item.querySelector("svg")) {
          item.click();
          await sleep(1000);

          const list = [
            ...(document.querySelector("ul")?.querySelectorAll("li") || []),
          ];

          for (const _ of list) {
            document.querySelector("button[aria-label='Next slide']")?.click();
            await sleep(500);
          }

          list.forEach((content, index) => {
            const url = new URL(
              content.querySelector("img")?.src || "https://example.com",
            );
            if (isImageUrl(url)) {
              imageUrls.add(getUrlObject(url, itemId, index + 1));
            }
          });

          document.querySelector("button[aria-label='Close']")?.click();
          await sleep(1000);
        } else {
          const url = new URL(
            item.querySelector("img")?.src || "https://example.com",
          );
          if (isImageUrl(url)) {
            imageUrls.add(getUrlObject(url, itemId, 1));
          }
        }
      }

      return { imageUrls, itemIds };
    };

    const getAllImageUrls = async (
      ignoreItemIds: Set<string> = new Set(),
    ) => {
      const { imageUrls, itemIds } = await getImageUrls(ignoreItemIds);
      if (isEndOfPage()) {
        return imageUrls;
      }

      window.scrollTo({
        top: document.body.scrollHeight ||
          document.documentElement.scrollHeight,
      });
      await sleep(2000);

      return imageUrls.union(
        await getAllImageUrls(ignoreItemIds.union(itemIds)),
      );
    };

    window.scrollTo({ top: 0 });
    await sleep(1000);

    console.log(
      [...(await getAllImageUrls())].map((item) =>
        `curl '${item.url}' -o ${item.name}`
      ).join("\n"),
    );
  });

  document.querySelector("body")?.appendChild(button);
})();
