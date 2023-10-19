<script lang="ts">
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/saluna/formsnap'
   import { forgotReq } from '$lib/saluna/validators'
   export let data: any // PageData
   export let token: string = ''
   let debug: boolean = false
</script>
<Form {debug} action="?/forgot" form={data.forgotForm} schema={forgotReq} let:config let:message options={{ 
   onResult: () => { token = '' }, 
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
   <button type="submit" class="button">Request Reset Code</button>
   <slot name="footer" />
</Form>