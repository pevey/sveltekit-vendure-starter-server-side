<script lang="ts">
	import type { SearchResult } from '$lib/generated/graphql'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import SearchHit from '$lib/components/SearchHit.svelte'
	import { enhance } from '$app/forms'
	import { queryParam } from 'sveltekit-search-params'
	const q = queryParam('q')

	export let data

	let hits: SearchResult[] = data?.hits || []
	let searchForm: HTMLFormElement

	const updateHits = function(result: any) {
		if (result.status === 200 && result.data.hits) {
			if (result.data.hits !== hits) {
				hits = result.data.hits
			}
		}
	}

	const handleClick = function(e: any) {
		$q = ''
		window.location.href = `/product/${e.detail}`
	}
</script>
<MetaTags title="Search" />
<div class="max-w-screen-2xl mx-auto my-8 px-6 md:px-8">
	<form bind:this={searchForm} action="/search?/search" method="POST" use:enhance={ async ({ cancel }) => {
		if (!$q) cancel()
		return async ({ result }) => updateHits(result)
	}}>
		<label for="q" class="sr-only">Search</label>
		<input type="search" name="q" id="q" bind:value={$q} on:input={() => searchForm.requestSubmit()} class="w-full block py-3 px-4 text-sm border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500" aria-label="Search" />
	</form>
	{#each hits as hit}
		<SearchHit {hit} on:click={handleClick} />
	{:else}
		{#if $q}
			<p>No results found.</p>
		{:else}
			<p>Enter a search term.</p>
		{/if}
	{/each}
</div>