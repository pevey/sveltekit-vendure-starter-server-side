<script lang="ts">
   import type { PageData } from './$types'
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/formsnap'
   import { signUpReq } from './validators'
   import ShowHideIcon from './ShowHideIcon.svelte'
   import AppleButton from './AppleButton.svelte'
   export let data: PageData
   export let token: string = ''
   let debug: boolean = false
   let reveal: boolean = false
</script>
<Form {debug} action="?/signUp" form={data.signUpForm} schema={signUpReq} let:config let:message options={{ 
   onResult: () => { token = '' }, 
   timeoutMs: 8000, multipleSubmits: 'prevent'
}}>
   <slot message={message} />
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
   <slot name="footer" />
</Form>