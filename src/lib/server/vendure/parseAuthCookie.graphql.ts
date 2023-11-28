import type { Cookies } from '@sveltejs/kit'
import cookie from 'cookie'

export const parseAuthCookie = async function(setCookie:string[] = [], locals:App.Locals, cookies:Cookies) {
	// Parses the setcookie header returned in a response from Vendure
	if (!setCookie) return false
	try {
		let sessionCookie: boolean = false
		let sessionSigCookie: boolean = false
		for (let rawCookie of setCookie) {
			let parsedCookie = cookie.parse(rawCookie)
			if (parsedCookie['session']) {
				locals.sid = parsedCookie['session']
				cookies.set('sid', parsedCookie['session'], {
					path: '/',
					expires: new Date(parsedCookie['expires']),
					sameSite: 'strict',
					httpOnly: true,
					secure: true
				})
				sessionCookie = true
			}
			if (parsedCookie['session.sig']) {
				locals.ssig = parsedCookie['session.sig']
				cookies.set('ssig', parsedCookie['session.sig'], {
					path: '/',
					expires: new Date(parsedCookie['expires']),
					sameSite: 'strict',
					httpOnly: true,
					secure: true
				})
				sessionSigCookie = true
			}
		}
		if (sessionCookie && sessionSigCookie) return true
	} catch (e) {
		console.log(e)
		return false
	}
}