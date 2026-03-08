import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import * as antd from "antd";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

const antdComponentNames = new Set(
  Object.keys(antd).filter((key) => key.match(/^[A-Z]/)),
);

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: env.VITE_BASE_NAME,
    plugins: [
      react(),
      AutoImport({
        imports: ["react"],
        resolvers: [
          (name) => {
            if (antdComponentNames.has(name)) {
              return { from: "antd" };
            }
          },
        ],
      }),
    ],
    server: {
      port: env.VITE_PORT,
      proxy: {
        [env.VITE_API]: {
          changeOrigin: true,
          target: "http://localhost:8080",
        },
      },
    },
    resolve: {
      alias: {
        "@": pathResolve("src"),
      },
    },
  });
};
