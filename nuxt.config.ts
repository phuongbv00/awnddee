// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/supabase"],
	runtimeConfig: {
		public: {
			appName: 'Awnddee',
			mapApiKey: ''
		}
	},
	ssr: false,
	supabase: {
		redirect: false,
	},
	css: ['maplibre-gl/dist/maplibre-gl.css'],
	colorMode: {
		preference: 'light',
	},
})
