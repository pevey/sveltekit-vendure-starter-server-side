<script lang="ts">
   import type { PageData } from './$types'
   import { Turnstile } from 'sveltekit-turnstile'
   import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'
   import AuthContainer from './AuthContainer.svelte'
   import SignInForm from './SignInForm.svelte'
   import SignUpForm from './SignUpForm.svelte'
   import ForgotForm from './ForgotForm.svelte'
   import ResetForm from './ResetForm.svelte'

   export let data: PageData

   const code = data.code // vendure token
   const rurl = data.rurl
   let token: string = '' // turnstile token
   type state = 'signIn' | 'signUp' | 'signUpSuccess' | 'forgot' | 'forgotSuccess' | 'reset' | 'resetSuccess'
   let state = code ? 'reset' : 'signIn'

   const handleSignIn = function() {
      console.log('signed in')
      window.location.href = rurl || '/'
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
      <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Sign In to Your Account</h3>
      <p class="text-lg text-gray-500 mb-10">If you have an existing account, enter your email and password below.</p>
      <SignInForm {data} {token} on:success={handleSignIn} />
      <div class="pt-6 text-gray-900 text-sm text-center font-medium">
         <span>Don't have an account?&nbsp;&nbsp;</span>
         <button type="button" on:click="{() => { state = 'signUp' }}" class="text-orange-900 hover:text-orange-700">Sign Up</button>
      </div>
      <div class="text-sm text-gray-900 text-center font-medium">
         <button type="button" on:click="{() => { state = 'forgot' }}" class="mt-4 hover:text-gray-700">Forgot your password?</button>
      </div>

   {:else if state === 'signUp'}
      <h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Create an Account</h3>
      <p class="text-lg text-gray-500 mb-10">Welcome! To create an account, please enter your email and choose a password below.</p>
      <SignUpForm {data} {token} on:success={() => { state = 'signUpSuccess' }} />
      <div class="pt-6 text-sm text-gray-900 text-center font-medium">
         <span>Already have an account?&nbsp;&nbsp;</span>
         <button type="button" on:click="{() => { state = 'signIn' }}" class="text-orange-900 hover:text-orange-700">Sign In</button>
      </div>

   {:else if state === 'signUpSuccess'}
      <div>Sign Up Successful</div>

   {:else if state === 'forgot'}
      <ForgotForm {data} {token} on:success={() => { state = 'forgotSuccess' }} />
      <div class="pt-6 text-sm text-gray-900 text-center font-medium">
         <button type="button" on:click="{() => { state = 'signIn' }}" class="text-gray-900 hover:text-orange-700">&larr;&nbsp; Sign In Instead</button>
      </div>

   {:else if state === 'forgotSuccess'}
      <div class="text-gray-900 mt-2 text-sm">
         <p class="text-center">If an account with that email exists, a reset code has been sent to your email address.</p>
      </div>

   {:else if state === 'reset'}
      <ResetForm {data} {token} {code} on:success={() => { state = 'resetSuccess' }} />

   {:else if state === 'resetSuccess'}
      <div class="text-gray-900 mt-2 text-sm">
         <p class="text-center">Your password has been reset.</p>
         <p class="text-center">You may now <a href="/auth/sign-in" class="text-orange-900 hover:text-orange-700">sign in</a>.</p>
      </div>
   {/if}
</AuthContainer>