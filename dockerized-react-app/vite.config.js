import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 3000,
    },
    proxy: {
      // Proxy all requests to the backend service
      "/api": {
        target: "http://backend:8080", // Point to the backend container (inside Docker)
        changeOrigin: true, // Change the origin of the host header to the target URL
        rewrite: (path) => path, // This keeps the original path (no modification)
      },
    },
  },
});
