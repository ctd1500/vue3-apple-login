import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		cssCodeSplit: false,
		emptyOutDir: true,
		lib: {
			entry: "./src/plugin/index.js",
			formats: ["es", "cjs"],
			name: "AppleLogin",
			fileName: "apple-login",
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
				exports: "named",
			},
		},
	},
});
