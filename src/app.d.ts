// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { SalunaConfig } from "../saluna.config"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			config: SalunaConfig
			sid: string // session id
			ssig: string // session signature
			token: string // vendure auth token
			user: any
			cart: any
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
