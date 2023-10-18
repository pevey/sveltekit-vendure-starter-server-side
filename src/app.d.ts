// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
      interface Locals {
         sid: string // session id
         ssig: string // session signature
         user: any
         cart: any
      }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
