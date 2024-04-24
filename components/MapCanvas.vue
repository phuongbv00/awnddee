<script setup lang="ts">
defineProps<{
	width: number | string
	height: number | string
}>()

const mapGL = useMapGL()
const mapRef = shallowRef()


onMounted(() => {
	mapGL.initMap(mapRef.value)
})

onUnmounted(() => {
	mapGL.destroyMap()
})

watch(mapGL.map, v => {
	console.log(v)
})

</script>

<template>
	<div ref="mapRef" :style="{width, height}"></div>
</template>

<style scoped>
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
