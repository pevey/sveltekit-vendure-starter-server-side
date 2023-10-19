<script lang="ts">
   import type { PageData } from './$types'
   import { goto, invalidateAll } from '$app/navigation'
   import { page } from '$app/stores'
   import { Turnstile } from 'sveltekit-turnstile'
   import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'
   import AuthContainer from './AuthContainer.svelte'
   import SignInForm from './SignInForm.svelte'
   import SignUpForm from './SignUpForm.svelte'
   import ForgotForm from './ForgotForm.svelte'
   import ResetForm from './ResetForm.svelte'

   export let data: PageData

   type state = 'signIn' | 'signUp' | 'forgot' | 'reset'
   let state = data.code? 'reset' : 'signIn'
   let token: string = '' // turnstile token

   const handleSignIn = async function() {
      invalidateAll()
      goto(data.rurl? data.rurl : '/')
   }

</script>
<AuthContainer>
   {#if !token}
      <Turnstile 
         theme="light" 
         siteKey={PUBLIC_TURNSTILE_SITE_KEY} 
         on:turnstile-callback={(e) => { token = e.detail.token }}
      />

   {:else if state === 'signIn'}
      <SignInForm {data} {token} let:message on:success={async () => handleSignIn()}>
         <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Sign In to Your Account</h3>
         {#if message}
            <div class="message" class:text-red-600={$page.status > 200}>{message}</div>
         {:else}
            <p class="text-lg text-gray-500 mb-6">If you have an existing account, enter your email and password below.</p>
         {/if}
         <div slot="footer">
            <div class="text-gray-900 text-sm text-center font-medium">
               <span>Don't have an account?&nbsp;&nbsp;</span>
               <button type="button" on:click="{() => { state = 'signUp' }}" class="text-orange-900 hover:text-orange-700">Sign Up</button>
            </div>
            <div class="text-sm text-gray-900 text-center font-medium">
               <button type="button" on:click="{() => { state = 'forgot' }}" class="mt-4 hover:text-gray-700">Forgot your password?</button>
            </div>
         </div>
      </SignInForm>

   {:else if state === 'signUp'}
      <SignUpForm {data} {token} let:message>
         <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Create an Account</h3>
         <p class="text-lg text-gray-500 mb-6">Welcome! To create an account, please enter your email and choose a password below.</p>
         <div slot="footer" class="text-sm text-gray-900 text-center font-medium">
            <span>Already have an account?&nbsp;&nbsp;</span>
            <button type="button" on:click="{() => { state = 'signIn' }}" class="text-orange-900 hover:text-orange-700">Sign In</button>
         </div>
      </SignUpForm>

   {:else if state === 'forgot'}
      <ForgotForm {data} {token} let:message>
         <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Reset Your Password</h3>
         <div slot="footer" class="pt-6 text-sm text-gray-900 text-center font-medium">
            <button type="button" on:click="{() => { state = 'signIn' }}" class="text-gray-900 hover:text-orange-700">&larr;&nbsp; Sign In Instead</button>
         </div>
      </ForgotForm>
      
   {:else if state === 'reset'}
      <ResetForm {data} {token} let:message>
         <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Choose a New Password</h3>
      </ResetForm>
   {/if}
</AuthContainer>