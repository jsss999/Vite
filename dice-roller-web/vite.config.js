// vite.config.js
import { defineConfig } from "vite";
export default defineConfig({
    base: "./",
    server: {
        allowedHosts: [".tunnelmole.net"],
        host: true
    }
});