import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(
                    new URL("./resources", import.meta.url)
                ),
            },
        ],
    },
});
