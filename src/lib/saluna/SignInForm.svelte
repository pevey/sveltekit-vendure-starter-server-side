<script lang="ts">
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/saluna/formsnap'
   import { signInReq } from '$lib/saluna/validators'
   import ShowHideIcon from '$lib/saluna/ShowHideIcon.svelte'
   import AppleButton from '$lib/saluna/AppleButton.svelte'
   import { createEventDispatcher } from 'svelte'
   const dispatch = createEventDispatcher()
   export let data: any // PageData
   export let token: string = ''
   let debug: boolean = false
   let reveal: boolean = false
</script>
<Form {debug} action="/auth?/signIn" form={data.signInForm} schema={signInReq} let:config let:message options={{ 
   onResult: ({ result }) => { if (result.type === 'success') { dispatch('success') }; token = '' },
   timeoutMs: 8000, multipleSubmits: 'prevent'
}}>
   <slot message={message} />
   <Field {config} name="token">
      <HiddenInput bind:value={token} />
   </Field>
   <Field {config} name="email">
      <Label>Email</Label>
      <Input type="email" />
      <Validation />
   </Field>
   <Field {config} name="password">
      <Label>Password</Label>
      <ShowHideIcon bind:reveal={reveal}>
         <Input type="{reveal? 'text' : 'password' }"/>
      </ShowHideIcon>
      <Validation />
   </Field>
   <button type="submit" class="button">Sign In</button>
   <AppleButton />
   <slot name="footer" />
</Form>