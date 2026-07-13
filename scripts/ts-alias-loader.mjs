import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const extensions = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const relativePath = specifier.slice(2);

    for (const extension of extensions) {
      const candidate = path.resolve(process.cwd(), `${relativePath}${extension}`);

      if (existsSync(candidate)) {
        return nextResolve(pathToFileURL(candidate).href, context);
      }
    }
  }

  return nextResolve(specifier, context);
}
