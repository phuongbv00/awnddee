<script setup lang="ts">
import type { MapOpts } from "~/composables/useMapGL";

const props = defineProps<{
	width: number | string
	height: number | string
	mapOpts: MapOpts
}>()

const mapGL = useMapGL(props.mapOpts)
const mapRef = shallowRef()
const mapOpts = computed(()  => props.mapOpts)

watch(mapOpts, newOpts => {
	if (newOpts.lng && newOpts.lat) {
		mapGL.goto(newOpts.lng, newOpts.lat)
	}
})


onMounted(() => {
	mapGL.initMap(mapRef.value)
})

onUnmounted(() => {
	mapGL.destroyMap()
})


</script>

<template>
	<div ref="mapRef" :style="{width, height}"></div>
</template>

<style scoped>
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
