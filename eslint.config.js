import config from "@romashka_rv/frontend-config/eslint";

export default [
  ...config,
  {
    ignores: ["next-env.d.ts"]
  }
];
