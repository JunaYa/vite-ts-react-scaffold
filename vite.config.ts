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
    Pages({
      routeStyle: "next",
      dirs: "src/pages",
      extensions: ["tsx"],
      exclude: ["**/components/**/*"],
      importMode(filepath, options) {
        if (filepath.includes("about")) return "sync";

        // default resolver
        for (const page of options.dirs) {
          if (
            page.baseRoute === "" &&
            filepath.startsWith(`/${page.dir}/index`)
          )
            return "sync";
        }
        return "async";
      },
      extendRoute(route, parent) {
        console.log("parent", parent); // eslint-disable-line no-console
        if (route.path === "/") {
          // Index is unauthenticated.
          return route;
        }

        // Augment the route with meta that indicates that the route requires authentication.
        return {
          ...route,
          meta: { auth: true },
        };
      },
    }),
    // https://github.com/unocss/unocss/tree/main/packages/vite
    Unocss({
      presets: [
        /* no presets by default */
      ],
    }),
    CrossOriginIsolation(),
  ],
});
