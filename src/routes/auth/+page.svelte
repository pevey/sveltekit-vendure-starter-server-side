<script lang="ts">
   import type { PageData } from './$types'
   import { goto, invalidateAll } from '$app/navigation'
   import AuthContainer from '$lib/saluna/AuthContainer.svelte'
   import AuthForm from '$lib/saluna/AuthForm.svelte'
   export let data: PageData
   const handleSignIn = async function() {
      invalidateAll()
      goto(data.rurl? data.rurl : '/')
   }
</script>
<AuthContainer>
   <AuthForm {data} on:success={ async () => handleSignIn() }/>
</AuthContainer>