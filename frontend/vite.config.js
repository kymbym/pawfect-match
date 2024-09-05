import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "update-commonjs-plugin",
      options(rawOptions) {
        const plugins = Array.isArray(rawOptions.plugins)
          ? [...rawOptions.plugins]
          : rawOptions.plugins
            ? [rawOptions.plugins]
            : [];

        const index = plugins.findIndex(
          (plugin) => plugin && plugin.name === "commonjs",
        );
        if (index !== -1) {
          plugins.splice(
            index,
            1,
            commonjs({
              include: [/node_modules/],
              extensions: [".js", ".cjs"],
              strictRequires: true,
            }),
          );
        }

        const nextConfig = { ...rawOptions, plugins };
        return commonjs().options.call(this, nextConfig);
      },
    },
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  define: {
    global: "window",
  },
});
