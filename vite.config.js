import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				bmi: resolve(__dirname, 'bmi.html'),
                rajapinnat: resolve(__dirname, 'rajapinnat.html'),
			},
		},
	},
	// Public base path could be set here too:
	//base: '/~ullamu/hyte/',
	base: './',
});