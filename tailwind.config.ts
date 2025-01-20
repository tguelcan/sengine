import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import { fontFamily } from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';
import { sunset } from 'daisyui/src/theming/themes';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		container: {
			center: true,
			screens: {
				'2xl': '1024px'
			},
			padding: {
				DEFAULT: '0.5rem',
				md: '0rem'
			}
		},
		fontFamily: {
			sans: ['Open Sans Variable', ...fontFamily.sans],
			serif: ['Playfair Display Variable', ...fontFamily.serif]
		},
		extend: {}
	},

	daisyui: {
		logs: false,
		themes: [
			{
				dark: {
					...sunset,
					'primary': '#89f336',
					'base-content': '#f2f4f7',
					'--rounded-box': '0.5rem',
					h1: {
						'@apply text-4xl font-serif font-medium': {}
					},
					h2: {
						'@apply text-3xl font-serif font-medium': {}
					},
					h3: {
						'@apply text-xl font-serif font-light': {}
					}
				}
			}
		]
	},

	plugins: [daisyui, typography]
} satisfies Config;
