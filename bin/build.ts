import * as path from "std/path/mod.ts";
import * as fs from "std/fs/mod.ts";
import { globToRegExp } from "std/path/mod.ts";
import * as esbuild from "esbuild/mod.js";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const entryPoints: string[] = [];
for await (
  const walkEntry of fs.walk(".", {
    match: [globToRegExp("**/src/*.user.ts")],
  })
) {
  entryPoints.push(path.join(__dirname, "../", walkEntry.path));
}

await esbuild.build({
  entryPoints,
  outdir: path.join(__dirname, "../scripts"),
  bundle: true,
  minify: true,
});

await Promise.all(entryPoints.map(async (entryPoint) => {
  const dest = path.join(
    __dirname,
    `../scripts/${path.parse(path.basename(entryPoint)).name}.js`,
  );

  const comment = (await Deno.readTextFile(entryPoint)).trim().match(
    new RegExp(
      /^\/\/ \=\=UserScript\=\=[\s\S]*?\/\/ \=\=\/UserScript\=\=/,
      "gm",
    ),
  ).at(0) || "";

  await Deno.writeTextFile(
    dest,
    comment + "\n\n" + (await Deno.readTextFile(dest)),
  );
}));

esbuild.stop();
