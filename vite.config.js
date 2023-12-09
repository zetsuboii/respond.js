import { defineConfig } from "vite";

export default defineConfig({
    root: "src",
    build: {
        target: "ES2020",
        lib: {
            entry: "respond.js",
            name: "Respond",
            fileName: (format) => `index.${format}.js`,
        },
        outDir: "../respond",
        emptyOutDir: true,
        sourcemap: true,
    },
});
