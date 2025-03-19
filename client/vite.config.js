import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: Number(import.meta.env.VITE_PORT) || 5173, // Dùng biến môi trường nếu có
  },
  build: {
    outDir: "dist",
  },
  base: "/",
});
