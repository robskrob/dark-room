import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    proxy: {
      // Match your local API path
      "/meta-images.json": {
        target:
          "http://www.web-origin-dark-room-app.s3-website-us-east-1.amazonaws.com",
        changeOrigin: true,
        secure: true, // optional, if the target has self-signed cert
      },
    },
  },
});
