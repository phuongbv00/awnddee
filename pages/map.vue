<script setup lang="ts">
import type { MapOpts } from "~/composables/useMapGL";
import type { Database } from "~/types/supabase";
import { Marker } from "maplibre-gl";

const userFilters = useUserFilters()

if (!userFilters.isValid()) {
	navigateTo('/')
}

const mapGL = useMapGL()
const supabase = useSupabaseClient<Database>()

const mapOpts = computed<MapOpts>(() => {
	return {
		lng: userFilters.location.value.lng,
		lat: userFilters.location.value.lat,
	}
})

const { data: $places } = await useAsyncData('get_places', async () => {
	const { data } = await supabase.from('places')
		.select('id, name, lng, lat, address, tags')
		.or(userFilters.selectedTags.value
			.map(t => `tags.cs.{${t}}`)
			.join(', '))
		.gte('lng', userFilters.location.value.lng - 0.015)
		.lte('lng', userFilters.location.value.lng + 0.015)
		.gte('lat', userFilters.location.value.lat - 0.015)
		.lte('lat', userFilters.location.value.lat + 0.015)
	return data
})
const places = computed(() => $places.value ?? [])
const markers = computed(() => places.value
	?.map(p => new Marker().setLngLat([p.lng, p.lat])))

const ui = ref({
	carousel: {
		item: 'basis-full',
		indicators: {
			wrapper: 'bottom-2 gap-1',
			base: 'h-2 w-2',
		}
	}
})

onMounted(() => {
	console.log(markers.value)
	mapGL.addMarkers(markers.value)
})

</script>

<template>
	<div class="h-full flex flex-col-reverse md:flex-row">
		<div class="w-full h-1/4 md:w-1/4">
			<UCarousel v-slot="{ item }" :items="places"
			           :ui="ui.carousel"
			           class="rounded-lg overflow-hidden" indicators>
				<div @click="mapGL.goto(item.lng, item.lat)"
				     class="p-5 pb-6">
					<h3 class="font-medium">{{ item.name }}</h3>
					<p class="text-gray-600">{{ item.address }}</p>
<!--					<div class="flex flex-wrap gap-1">-->
<!--						<UBadge v-for="tag of item.tags"-->
<!--						        :ui="{ rounded: 'rounded-full' }"-->
<!--						        size="sm"-->
<!--						        class="leading-5">-->
<!--							{{ tag }}-->
<!--						</UBadge>-->
<!--					</div>-->
				</div>
			</UCarousel>
		</div>
		<MapCanvas class="flex-grow" :map-opts="mapOpts"></MapCanvas>
	</div>
</template>

<style scoped>

</style>
