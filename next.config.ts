import type { NextConfig } from "next";

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
        loaders: ["@svgr/webpack"],
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
  experimental: {
    useCache: true,
    authInterrupts: true
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      loader: "@svgr/webpack",
      options: {
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }
      }
    });

    config.module.rules.push({
      test: /\.tsx$/,
      loader: "string-replace-loader",
      options: stringReplaceOptions
    });

    return config;
  }
};

export default nextConfig;
