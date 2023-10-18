<script lang="ts">
   // usage
   // <ShowHideIcon bind:reveal={reveal}>
   //    <input
   //       name="password"
   //       type="{reveal? 'text' : 'password' }"
   //       class="input"
   //       aria-invalid={$loginErrors.password ? 'true' : undefined}
   //       on:input={(e) => { $loginForm.password = e.target.value }}
   //    />
   // </ShowHideIcon>
   import { Eye } from 'lucide-svelte'
   export let reveal: boolean = false
</script>
<div class="relative">
   <slot />
   <button type="button" on:click="{() => reveal = !reveal }" class="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100 text-gray-400">
      <Eye />
   </button>
</div>
