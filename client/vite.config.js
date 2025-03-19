import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: ["book-store-production-9863.up.railway.app"],
    hmr: {
      clientPort: 443, // Fix lỗi WebSocket
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext", // Fix lỗi không tương thích
    },
  },
});
