<script lang="ts">
	import type { Collection, Customer, Order } from '$lib/generated/graphql'
	import Cart from '$lib/components/Cart.svelte'
	import Account from '$lib/components/Account.svelte'
	import SearchBox from '$lib/components/SearchBox.svelte'
	import SideBar from '$lib/components/SideBar.svelte'
	import ThemeSwitcher from './ThemeSwitcher.svelte'
	export let collections: Collection[]
	export let user: Customer|null
	export let cart: Order|null
	export let count: number = 0
</script>
<nav class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 bg-transparent">
	<div class="flex flex-grow items-center justify-between mt-3">
		<div class="flex flex-none items-center">
			<a class="inline-block text-3xl font-bold" href="/">
				<img class="block h-14 w-auto md:hidden" src="/logo.png" alt="Louisiana Roasting Company">
				<img class="hidden h-auto w-auto md:block" src="/logo.png" alt="Louisiana Roasting Company">
			</a>
			<div class="hidden lg:block mr-auto lg:ml-6">
				{#each collections as collection}
					<a href="/collection/{collection.slug}" class="py-2 px-3 mr-2 rounded-md font-medium text-lg lg:hover:bg-stone-200">{collection.name}</a>
				{:else}
					Error: No collections found
				{/each}
			</div>
		</div>
		<div class="flex flex-grow align-middle items-center justify-between ml-4">
			<SearchBox />
		</div>
		<div class="flex flex-none relative align-middle justify-end lg:ml-4">
			<div>  
				<ThemeSwitcher />			
			</div>
			<div>
				<Cart bind:cart={cart} bind:count={count} />
			</div>
			<div class="hidden md:block">
				<Account {user} />
			</div>
			<div class="lg:hidden">
				<SideBar {collections} {user} />
			</div>
		</div>
	</div>
</nav>