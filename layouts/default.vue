<script setup lang="ts">
const router = useRouter()

const currentPath = computed(() => router.currentRoute.value.path)

</script>

<template>
	<div class="h-dvh flex flex-col">
		<div class="p-3 flex">
			<UButton
				v-if="currentPath !== '/'"
				color="gray"
				icon="i-heroicons-chevron-left"
				size="md"
				variant="ghost"
				:padded="false"
				@click="router.back"
			/>
			<div class="ms-auto">
				<UAvatar icon="i-heroicons-user" size="md"/>
			</div>
		</div>
		<div class="flex-grow">
			<slot/>
		</div>
	</div>
</template>

<style scoped>

</style>
