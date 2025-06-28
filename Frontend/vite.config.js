import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// You can also import dotenv if using environment variables
// import dotenv from 'dotenv'
// dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5000,
    proxy: {
      "/api": {
        target: `http://${process.env.MINIKUBE_IP}:${process.env.BACKEND_NODEPORT}`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
