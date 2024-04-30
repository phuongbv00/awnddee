import type { ShallowRef } from "@vue/reactivity";
import { Map, Marker } from "maplibre-gl";

export type MapOpts = {
	lng?: number
	lat?: number
	zoom?: number
}

export type MapSafeOpts = {
	lng: number
	lat: number
	zoom: number
}

const defaultMapOpts: MapSafeOpts = {
	lng: 105.84108235711108,
	lat: 21.02257440672384,
	zoom: 14,
}

export default (opts: MapOpts = defaultMapOpts) => {
	const _configs = useRuntimeConfig()
	const _mapApiKey = _configs.public.mapApiKey

	const mapOpts: MapSafeOpts = Object.assign(defaultMapOpts, opts)
	const map: ShallowRef<Map | undefined> = useState('map')

	const initMap = (rawContainer: HTMLElement) => {
		map.value = markRaw(new Map({
			container: rawContainer,
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${_mapApiKey}`,
			center: [mapOpts.lng, mapOpts.lat],
			zoom: mapOpts.zoom,
		}));
	}
	const destroyMap = () => map.value?.remove()
	const goto = (lng: number, lat: number) => {
		map.value?.setCenter({ lng, lat })
	}

	function addMarkers(markers: Marker[] = []) {
		if (map.value) {
			markers.forEach(m => m.addTo(<Map>map.value))
		}
	}

	return {
		mapOpts,
		initMap,
		destroyMap,
		goto,
		addMarkers,
	}
}
