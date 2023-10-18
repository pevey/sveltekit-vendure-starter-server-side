<script lang="ts">
   import type { PageData } from './$types'
   import { page } from '$app/stores'
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/formsnap'
   import { forgotReq } from './validators'
   import { createEventDispatcher } from 'svelte'
   const dispatch = createEventDispatcher()
   export let data: PageData
   export let token: string = ''
   let debug: boolean = true
</script>
<Form {debug} action="?/forgot" form={data.forgotForm} schema={forgotReq} let:config let:message options={{ 
   onResult: ({ result }) => { token = ''; if (result.type === 'success') { dispatch('success') } }, 
   timeoutMs: 8000, multipleSubmits: 'prevent'
}}>
   {#if message}
      <div class="message" class:text-red-600={$page.status > 200}>
         {message}
      </div>
   {:else}
      <p class="my-4 text-center text-gray-900 font-medium">Enter your email address</p>
      <Field {config} name="token">
         <HiddenInput bind:value={token} />
      </Field>
      <Field {config} name="email">
         <Label>Email</Label>
         <Input type="email" />
         <Validation />
      </Field>
      <button type="submit" class="button">Request Reset Code</button>
   {/if}
</Form>