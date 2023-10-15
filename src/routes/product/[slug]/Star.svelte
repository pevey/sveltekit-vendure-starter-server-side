<script lang="ts">
   export let filled = '' // can be null, true, or 'half'
</script>
<!--
   Heroicon name: mini/star
   Active: "text-yellow-400", Default: "text-gray-300"
-->
{#if filled}
{#if filled === 'half'}
<svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
   <path d="M 9.049,2.927 C 9.1985626,2.4678429 9.5974148,2.2375949 9.9968701,2.2362559 l -5.9e-6,11.8199721 C 9.7915851,14.056767 9.5864369,14.120358 9.412,14.247 l -2.8,2.034 C 5.828,16.851 4.774,16.084 5.073,15.163 l 1.07,-3.292 C 6.276704,11.45883 6.1297413,11.007444 5.779,10.753 L 2.98,8.72 C 2.197,8.15 2.6,6.91 3.568,6.91 H 7.029 C 7.4619424,6.9101141 7.8457879,6.6316142 7.98,6.22 L 9.05,2.928 Z" />
</svg>
{:else}
<svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
   <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
</svg>
{/if}
{:else}
<svg class="text-gray-300 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
   <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
</svg>
{/if}