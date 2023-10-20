<script lang="ts">
   import { page } from '$app/stores'
   import { createEventDispatcher } from 'svelte'
   import { Turnstile } from 'sveltekit-turnstile'
   import { Form, Field, Label, Input, Validation, HiddenInput } from '$lib/saluna/formsnap'
   import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'
   import { signInReq, signUpReq, forgotReq, resetReq } from '$lib/saluna/validators'
   import ShowHideIcon from '$lib/saluna/ShowHideIcon.svelte'
   import AppleButton from '$lib/saluna/AppleButton.svelte'
   
   export let data: any
   
   type state = 'signIn' | 'signUp' | 'forgot' | 'reset'
   let state = data.code? 'reset' : 'signIn'
   let token: string = '' // turnstile token
   let reveal: boolean = false
   let debug: boolean = false
   const dispatch = createEventDispatcher()
</script>

{#if !token}
   <Turnstile 
      theme="light" 
      siteKey={PUBLIC_TURNSTILE_SITE_KEY} 
      on:turnstile-callback={(e) => { token = e.detail.token }}
   />

{:else if state === 'signIn'}
   <Form {debug} action="/auth?/signIn" form={data.signInForm} schema={signInReq} let:config let:message options={{ 
      onResult: ({ result }) => { if (result.type === 'success') { dispatch('success') }; token = '' },
      timeoutMs: 8000, multipleSubmits: 'prevent'
   }}>
      <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Sign In to Your Account</h3>
      {#if message}
         <div class="message" class:text-red-600={$page.status > 200}>{message}</div>
      {:else}
         <p class="text-lg text-gray-500 mb-6">If you have an existing account, enter your email and password below.</p>
      {/if}
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
      <div class="text-gray-900 text-sm text-center font-medium">
         <span>Don't have an account?&nbsp;&nbsp;</span>
         <button type="button" on:click="{() => { state = 'signUp' }}" class="text-orange-900 hover:text-orange-700">
            Sign Up
         </button>
      </div>
      <div class="text-sm text-gray-900 text-center font-medium">
         <button type="button" on:click="{() => { state = 'forgot' }}" class="mt-4 hover:text-gray-700">
            Forgot your password?
         </button>
      </div>
   </Form>

{:else if state === 'signUp'}
   <Form {debug} action="/auth?/signUp" form={data.signUpForm} schema={signUpReq} let:config let:message options={{ 
      onResult: () => { token = '' }, 
      timeoutMs: 8000, multipleSubmits: 'prevent'
   }}>
      <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Create an Account</h3>
      <p class="text-lg text-gray-500 mb-6">Welcome! To create an account, please enter your email and choose a password below.</p>
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
      <div class="text-sm text-gray-900 text-center font-medium">
         <span>Already have an account?&nbsp;&nbsp;</span>
         <button type="button" on:click="{() => { state = 'signIn' }}" class="text-orange-900 hover:text-orange-700">
            Sign In
         </button>
      </div>
   </Form>

{:else if state === 'forgot'}
   <Form {debug} action="/auth?/forgot" form={data.forgotForm} schema={forgotReq} let:config let:message options={{ 
      onResult: () => { token = '' }, 
      timeoutMs: 8000, multipleSubmits: 'prevent'
   }}>
      <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Reset Your Password</h3>
      <p class="text-lg text-gray-500 mb-6">Enter your email address to receive an email with a link to change your password.</p>
      <Field {config} name="token">
         <HiddenInput bind:value={token} />
      </Field>
      <Field {config} name="email">
         <Label>Email</Label>
         <Input type="email" />
         <Validation />
      </Field>
      <button type="submit" class="button">Request Reset Code</button>
      <div class="pt-6 text-sm text-gray-900 text-center font-medium">
         <button type="button" on:click="{() => { state = 'signIn' }}" class="text-gray-900 hover:text-orange-700">
            &larr;&nbsp; Sign In Instead
         </button>
      </div>
   </Form>

{:else if state === 'reset'}
   <Form {debug} action="/auth?/reset" form={data.resetForm} schema={resetReq} let:config let:message options={{ 
      onResult: () => { token = '' }, 
      timeoutMs: 8000, multipleSubmits: 'prevent'
   }}>
      <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Choose a New Password</h3>
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
{/if}