// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@vueuse/nuxt", "nuxt-icon", "@nuxtjs/supabase"],
	runtimeConfig: {
		public: {
			appName: 'Awnddee',
			mapApiKey: ''
		}
	},
	ssr: false,
	supabase: {
		redirect: false,
	}
})
