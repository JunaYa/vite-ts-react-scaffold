import path from "path";
import { defineConfig } from "vite";
import React from "@vitejs/plugin-react-swc";
import Unocss from "unocss/vite";
import Pages from "vite-plugin-pages";
import CrossOriginIsolation from "vite-plugin-cross-origin-isolation";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
      "/assets": `${path.resolve(__dirname, "src/assets")}/`,
    },
  },
  plugins: [
    React(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/unocss/unocss/tree/main/packages/vite
    Unocss({
      presets: [
        /* no presets by default */
      ],
    }),
    CrossOriginIsolation(),
  ],
});
