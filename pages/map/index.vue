<script setup lang="ts">
import type { MapOpts } from "~/composables/useMapGL";
import type { Database } from "~/types/supabase";
import { Marker } from "maplibre-gl";

const userFilters = useUserFilters()
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
const places = computed(() => $places.value)
const markers = computed(() => places.value
	?.map(p => new Marker().setLngLat([p.lng, p.lat])))

onMounted(() => {
	console.log(markers.value)
	mapGL.addMarkers(markers.value)
	mapGL.addMarkers([new Marker().setLngLat(userFilters.location.value)])
})

</script>

<template>
	<div class="h-dvh flex flex-col-reverse md:flex-row">
		<div class="w-full h-1/4 md:w-1/4">
			<div v-for="p of places"
			     @click="mapGL.goto(p.lng, p.lat)"
			     class="p-5">
				<h3>{{ p.name }}</h3>
				<p>{{ p.address }}</p>
			</div>
		</div>
		<MapCanvas class="flex-grow" :map-opts="mapOpts"></MapCanvas>
	</div>
</template>

<style scoped>

</style>
