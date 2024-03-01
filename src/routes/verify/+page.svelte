<script lang="ts">
	import type { PageData } from './$types'
	import MetaTags from '$lib/components/MetaTags.svelte'
	export let data: PageData
</script>
<MetaTags title="Email Confirmation" />
{data.code}
{data.success}