import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params, url }) {
	const code = params.code
	const status = url.searchParams.get('redirect_status')
	return {
		code
	}
}