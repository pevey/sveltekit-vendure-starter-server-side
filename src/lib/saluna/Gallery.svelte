<script lang="ts">
   import VendureAsset from '$lib/saluna/VendureAsset.svelte'
   export let images: any = []
   let selectedImage = images[0]?.preview || '$lib/saluna/img/noimg.png'
   // should probably remove the function below
   function selectImage(index: number) {
      selectedImage = images[index].preview
   }
</script>
<div class="flex flex-col-reverse">
   <!-- Image selector -->
   <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
      <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
         {#each images as image, i}
            <button on:click={() => { selectImage(i) }} class="ring-lime-600 relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" aria-controls="tabs-1-panel-1" role="tab" type="button">
               <span class="absolute inset-0 overflow-hidden rounded-md">
                  <VendureAsset preview={image.preview} preset="thumb" alt={`Preview image ${i}`} class="h-full w-full object-cover object-center"/>
               </span>
            </button>
         {:else}
            <div></div>
         {/each}
      </div>
   </div>
   <!-- Image display -->
   <VendureAsset preview={selectedImage} preset="large" alt="selected image" class="max-h-[50vh] w-full object-cover rounded-md sm:rounded-lg overflow-hidden" />
</div>