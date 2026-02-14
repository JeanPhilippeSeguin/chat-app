import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "./src/config"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
