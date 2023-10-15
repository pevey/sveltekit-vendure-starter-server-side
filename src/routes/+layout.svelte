<script lang="ts">
   import '$src/app.postcss'
   import type { PageData } from './$types'
   import type { Collection } from '$lib/generated/graphql'
   import { page } from '$app/stores'
   import NavBar from './NavBar.svelte'
   import Footer from './Footer.svelte'
   export let data: PageData
   const nakedPaths = ['/auth', '/checkout', '/sitemap.xml']
   const collections = data.collections as Collection[]
   $: naked = nakedPaths.includes($page.url.pathname)
   $: user = data?.user
   $: cart = data?.cart
   $: count = cart?.items?.length || null
</script>
{#if naked}
   <slot />
{:else}
   <NavBar {collections} bind:user={user} bind:cart={cart} bind:count={count} />
   <slot />
   <Footer />
{/if}