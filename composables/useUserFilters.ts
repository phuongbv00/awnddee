import { useStorage } from '@vueuse/core'

export default () => {
	const location = useStorage('location', {
		lng: 0,
		lat: 0,
	});
	const selectedTags = useStorage<number[]>('selectedTags', [])

	return {
		location,
		selectedTags,
	}
}
