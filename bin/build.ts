import * as path from "@std/path";
import * as fs from "@std/fs";
import * as esbuild from "esbuild/mod.js";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const entryPoints: string[] = [];
for await (
  const walkEntry of fs.walk(".", {
    match: [path.globToRegExp("**/src/*.user.ts")],
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
  )?.at(0) || "";

  await Deno.writeTextFile(
    dest,
    comment + "\n\n" + (await Deno.readTextFile(dest)),
  );
}));

esbuild.stop();
