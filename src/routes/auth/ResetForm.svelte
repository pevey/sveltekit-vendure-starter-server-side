<script lang="ts">
   import type { PageData } from './$types'
   import { page } from '$app/stores'
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/formsnap'
   import { resetReq } from './validators'
   import ShowHideIcon from './ShowHideIcon.svelte'
   import { createEventDispatcher } from 'svelte'
   const dispatch = createEventDispatcher()
   export let data: PageData
   export let token: string = ''
   let debug: boolean = true
   let reveal: boolean = false
</script>
<Form {debug} action="?/reset" form={data.resetForm} schema={resetReq} let:config let:message options={{ 
   onResult: ({ result }) => { token = ''; if (result.type === 'success') { dispatch('success') } }, 
   timeoutMs: 8000, multipleSubmits: 'prevent'
}}>
   {#if message}
      <div class="message" class:text-red-600={$page.status > 200}>
         {message}
      </div>
   {:else}
      <p class="my-4 text-center text-gray-900 font-medium">Choose a new password</p>
      <Field {config} name="token">
         <HiddenInput bind:value={token} />
      </Field>
      <Field {config} name="code">
         <HiddenInput bind:value={data.code} />
      </Field>
      <Field {config} name="password">
         <Label>Password</Label>
         <ShowHideIcon bind:reveal={reveal}>
            <Input type="{reveal? 'text' : 'password' }" class="input" />
         </ShowHideIcon>
         <Validation />
      </Field>
      <button type="submit" class="button">Request Reset Code</button>
   {/if}
</Form>   