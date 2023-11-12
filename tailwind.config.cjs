/** @type {import('tailwindcss').Config}*/
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve(
		'@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	)],
	theme: {
		extend: {
			fontFamily: {
				'noto-sans': ['Noto Sans', 'sans']
			}
		}
	},

	plugins: [
		skeleton({ themes: { preset: [ 'skeleton' ] } })
	]
};

module.exports = config;
