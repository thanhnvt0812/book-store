import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist", // Đảm bảo output directory là 'dist'
  },
  server: {
    proxy: {
      "/api": {
        target: "https://book-store-ylxg.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
