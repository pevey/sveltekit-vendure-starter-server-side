<script lang="ts">
   import type { PageData } from './$types'
   import AuthContainer from '$lib/saluna/AuthContainer.svelte'
   import AuthForm from '$lib/saluna/AuthForm.svelte'
   export let data: PageData
</script>
<AuthContainer>
   <AuthForm {data} />
</AuthContainer>