<script lang="ts">
   import '$src/app.postcss'
   import type { PageData } from './$types'
   import type { Collection } from '$lib/generated/graphql'
   import { browser } from '$app/environment'
   import { page } from '$app/stores'
   import NavBar from './NavBar.svelte'
   import Footer from './Footer.svelte'
   export let data: PageData
   const nakedPaths = ['/auth', '/checkout', '/sitemap.xml']
   const collections = data.collections as Collection[]
   $: naked = nakedPaths.includes($page.url.pathname)
   $: user = data?.user
   $: cart = data?.cart
   $: count = cart?.lines?.length || null
   // save token to local storage if using bearer token auth
   if (browser && data?.token) window.localStorage.setItem('token', data.token)
</script>
{#if naked}
   <slot />
{:else}
   <NavBar {collections} bind:user={user} bind:cart={cart} bind:count={count} />
   <slot />
   <Footer />
{/if}