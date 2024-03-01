<script lang="ts">
	export let preview: string = ''
	export let preset: 'tiny' | 'thumb' | 'small' | 'medium' | 'large' = 'medium'
	export let alt: string = ''
	let className: string = ''
	export { className as class }
</script>
{#if preview}
	<picture>
		<source type="image/avif" srcSet={preview + `?preset=${preset}&format=avif`} />
		<source type="image/webp" srcSet={preview + `?preset=${preset}&format=webp`} />
		<img src={preview + `?preset=${preset}&format=jpg`} alt={alt} class={className} />
	</picture>
{/if}