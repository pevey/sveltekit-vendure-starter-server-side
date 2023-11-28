import { gql } from '$lib/generated'
import { query } from '.'

export const setOrderState = async function(locals: App.Locals, state: string) {
	const TransitionOrderToState = gql(`
		mutation TransitionToState($state: String!) {
			transitionOrderToState(state: $state) {
				...ActiveOrder
				...on OrderStateTransitionError {
					errorCode
					message
					transitionError
					fromState
					toState
				}
			}
		}
	`)
	return await query({ document: TransitionOrderToState, variables: { state }, locals })
		.then((response) => response?.json())
		.then((body) => body?.data?.transitionOrderToState)
		.catch(() => { return null })
}