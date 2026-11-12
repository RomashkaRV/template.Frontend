import type { NextConfig } from "next";

// Превращает <button classNames={[a, { b: cond }, c]} /> в className="a b c".
// Работает через loader Turbopack (в Next 16 он используется и в dev, и в build).
const stringReplaceOptions = {
  search: "classNames={\\[([\\s\\S]*?)]}",
  replace: `className={[$1]
    .map((className) => {
      if (!className) {
        return "";
      }

      if (typeof className === "string") {
        return className;
      }

      return Object.entries(className)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .flat();
    })
    .join(" ")}`,
  flags: "g"
};

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: { overrides: { removeViewBox: false } }
                  }
                ]
              }
            }
          }
        ],
        as: "*.js"
      },
      "*.tsx": {
        loaders: [
          {
            loader: "string-replace-loader",
            options: stringReplaceOptions
          }
        ]
      }
    }
  },
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    authInterrupts: true
  }
};

export default nextConfig;
