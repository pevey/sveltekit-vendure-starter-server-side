import { gql } from '$lib/generated'
import { query } from '.'

export const getCollection = async function(slug: string) {
	if (!slug) return []
	const GetCollection = gql(`
		query GetCollection($slug: String!) {
			collection(slug: $slug) {
				id
				name
				slug
				description
				featuredAsset {
					id
					preview
				}
			}
		}
	`)
	return await query({ document: GetCollection, variables: { slug } })
		.then((response) => response?.json())
		.then((body) => body?.data?.collection)
		.catch(() => { return null })
}