<script setup lang="ts">
import type { MapOpts } from "~/composables/useMapGL";

const userFilters = useUserFilters()
const mapOpts = computed<MapOpts>(() => {
	return {
		lng: userFilters.location.value.lng,
		lat: userFilters.location.value.lat,
	}
})

</script>

<template>
	<div class="h-dvh flex flex-col-reverse md:flex-row">
		<div class="w-full h-1/4 md:w-1/4">o</div>
		<MapCanvas class="flex-grow" :map-opts="mapOpts"></MapCanvas>
	</div>
</template>

<style scoped>

</style>
