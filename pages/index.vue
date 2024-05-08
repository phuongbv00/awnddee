<script setup lang="ts">

import type { Database } from "~/types/supabase";

const userFilters = useUserFilters()
const config = useRuntimeConfig()

const appName = config.public.appName

const supabase = useSupabaseClient<Database>()

const { data: $tags } = await useAsyncData('get_tags', async () => {
	const { data } = await supabase.from('tags').select('id, label')
	return data
})
const tags = computed(() => $tags.value ?? [])
const selectedTags = computed({
	get: () => {
		const selectedTagIds = userFilters.selectedTags
		return tags.value.filter(t => selectedTagIds.value.includes(t.id))
	},
	set: (tags) => {
		userFilters.selectedTags.value = tags.map((tag) => tag.id)
	}
})
const btnLoading = ref(false)

function search() {
	btnLoading.value = true
	navigator.geolocation.getCurrentPosition(pos => {
		userFilters.location.value = {
			lng: pos.coords.longitude,
			lat: pos.coords.latitude,
		}
		navigateTo(`/map`)
	}, err => {
		console.log(err)
		alert(err.message)
	})
}

function removeTag(tagId: number) {
	selectedTags.value = selectedTags.value.filter(t => t.id !== tagId)
}

</script>

<template>
	<div class="flex flex-col justify-center h-full p-3 max-w-md m-auto">
		<h1 class="block text-center text-6xl text-gray-700 mb-10">{{ appName }}</h1>
		<div class="flex flex-wrap gap-2 justify-center">
			<UBadge v-for="tag of selectedTags"
			        @click="removeTag(tag.id)"
			        :ui="{ rounded: 'rounded-full' }"
			        size="sm"
			        class="cursor-pointer hover:bg-primary-600 leading-5">
				{{ tag.label }}&nbsp;
				<UIcon name="i-heroicons-x-circle" style="margin-right: -4px;" class="text-xl"/>
			</UBadge>
		</div>
		<div class="flex gap-2 mt-7 flex-col sm:flex-row">
			<USelectMenu class="flex-grow" searchable size="xl" v-model="selectedTags" :options="tags" multiple
			             placeholder="Pick some tags..."
			             :popper="{placement: 'top'}"/>
			<UButton :loading="btnLoading" @click="search" size="lg" class="justify-center">Lookup near me!</UButton>
		</div>
		<h1 class="block text-center text-6xl text-transparent mb-10">{{ appName }}</h1>
	</div>
</template>

<style scoped>

</style>
