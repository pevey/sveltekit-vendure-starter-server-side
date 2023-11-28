import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { join } from 'path'
import 'dotenv/config'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		style: {
			css: {
				postcss: join(process.cwd(), 'postcss.config.cjs')
			}
		}
	}),
	kit: {
		adapter: adapter(),
		alias: {
			'$src/*': 'src/*'
		}
		// csp: {
		// 	directives: {
		// 		'script-src': ['self', 'https://laroastingco.com/', 'https://challenges.cloudflare.com/', 'https://js.stripe.com/'],
		// 		'img-src': ['self', 'https://laroastingco.com/', 'data:', process.env.ORIGIN, 'https://challenges.cloudflare.com/', 'https://js.stripe.com/'],
		// 	}
		// }
	},
}

export default config
