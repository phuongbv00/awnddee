import type { ShallowRef } from "@vue/reactivity";
import { Map } from "maplibre-gl";

export type MapOpts = {
	lng?: number
	lat?: number
	zoom?: number
}

export default () => {
	const configs = useRuntimeConfig()
	const map: ShallowRef<Map | undefined> = useState('map')
	const mapApiKey = configs.public.mapApiKey
	const defaultMapOpts: MapOpts = {
		lng: 105.84108235711108,
		lat: 21.02257440672384,
		zoom: 10
	}
	const initMap = (rawContainer: HTMLElement, opts: MapOpts = defaultMapOpts) => {
		const combinedOpts = Object.assign(defaultMapOpts, opts)
		map.value = markRaw(new Map({
			container: rawContainer,
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapApiKey}`,
			center: [combinedOpts.lng ?? 0, combinedOpts.lat ?? 0],
			zoom: combinedOpts.zoom,
		}));
	}
	const destroyMap = () => map.value?.remove()

	return {
		map,
		initMap,
		destroyMap,
	}
}
