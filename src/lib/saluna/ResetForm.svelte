<script lang="ts">
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/saluna/formsnap'
   import { resetReq } from '$lib/saluna/validators'
   import ShowHideIcon from '$lib/saluna/ShowHideIcon.svelte'
   export let data: any // PageData
   export let token: string = ''
   let debug: boolean = false
   let reveal: boolean = false
</script>
<Form {debug} action="?/reset" form={data.resetForm} schema={resetReq} let:config let:message options={{ 
   onResult: () => { token = '' }, 
   timeoutMs: 8000, multipleSubmits: 'prevent'
}}>
   <slot message={message} />
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
   <slot name="footer" />
</Form>   