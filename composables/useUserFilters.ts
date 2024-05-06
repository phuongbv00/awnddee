import { useStorage } from '@vueuse/core'

export default () => {
	const location = useStorage('location', {
		lng: 0,
		lat: 0,
	});
	const selectedTags = useStorage<number[]>('selectedTags', [])

	function isValid() {
		return location.value.lat !== 0 && location.value.lng !== 0 && selectedTags.value.length > 0
	}

	return {
		location,
		selectedTags,
		isValid,
	}
}
