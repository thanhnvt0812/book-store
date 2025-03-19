import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: ["book-store-production-9863.up.railway.app"], // Thêm host vào đây
    cors: true, // Cho phép CORS nếu cần
  },
  build: {
    outDir: "dist",
  },
  base: "/",
});
