<script lang="ts">
   import type { PageData } from './$types'
   import { page } from '$app/stores'
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/formsnap'
   import { signUpReq } from './validators'
   import ShowHideIcon from './ShowHideIcon.svelte'
   import AppleButton from './AppleButton.svelte'
   import { createEventDispatcher } from 'svelte'
   const dispatch = createEventDispatcher()
   export let data: PageData
   export let token: string = ''
   let debug: boolean = true
   let reveal: boolean = false
</script>
<Form {debug} action="?/signUp" form={data.signUpForm} schema={signUpReq} let:config let:message options={{ 
   onResult: ({ result }) => { if (result.type === 'success') { dispatch('success') } else { token = '' } }, 
   timeoutMs: 8000, multipleSubmits: 'prevent'
}}>
   {#if message}
      <div class="message" class:text-red-600={$page.status > 200}>
         {message}
      </div>
   {:else}
      <Field {config} name="token">
         <HiddenInput bind:value={token} />
      </Field>
      <Field {config} name="fname">
         <Label>First Name</Label>
         <Input type="text" />
         <Validation />
      </Field>
      <Field {config} name="lname">
         <Label>Last Name</Label>
         <Input type="text" />
         <Validation />
      </Field>
      <Field {config} name="email">
         <Label>Email</Label>
         <Input type="email" />
         <Validation />
      </Field>
      <Field {config} name="password">
         <Label>Password</Label>
         <ShowHideIcon bind:reveal={reveal}>
            <Input type="{reveal? 'text' : 'password' }" class="input" />
         </ShowHideIcon>
         <Validation />
      </Field>
      <button type="submit" class="button">Create Account</button>
      <AppleButton />
   {/if}
</Form>