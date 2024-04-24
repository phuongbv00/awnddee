<script setup lang="ts">
import type { MapOpts } from "~/composables/useMapGL";

const mapOpts = ref<MapOpts>({})

navigator.geolocation.getCurrentPosition(pos => {
	mapOpts.value = {
		lng: pos.coords.longitude,
		lat: pos.coords.latitude,
	}
}, err => {
	console.log(err)
	alert(err.message)
})

</script>

<template>
	<MapCanvas width="80dvw" height="100dvh" :map-opts="mapOpts"></MapCanvas>
</template>

<style scoped>

</style>
