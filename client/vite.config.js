import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: ["book-store-production-9863.up.railway.app"], // Thêm host vào danh sách cho phép
    cors: true, // Cho phép CORS nếu cần
    hmr: {
      protocol: "wss",
      host: "book-store-production-9863.up.railway.app",
      clientPort: 443, // Đảm bảo WebSocket chạy trên cổng HTTPS
    },
  },
  build: {
    outDir: "dist",
  },
  base: "/",
});
