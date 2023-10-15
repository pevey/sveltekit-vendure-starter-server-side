/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query GetProducts($options: ProductListOptions) {\n         products(options: $options) {\n            totalItems\n            items {\n               id\n               name\n               slug\n               description\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   ": types.GetProductsDocument,
    "\n      query GetTopLevelCollections {\n         collections(options: { topLevelOnly: true }) {\n            items {\n               id\n               slug\n               name\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   ": types.GetTopLevelCollectionsDocument,
    "\n      query GetCollections {\n         collections {\n            items {\n               id\n               slug\n               name\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   ": types.GetCollectionsDocument,
    "\n      query GetCollection($slug: String!) {\n         collection(slug: $slug) {\n            id\n            name\n            slug\n            description\n            featuredAsset {\n               id\n               preview\n            }\n         }\n      }\n   ": types.GetCollectionDocument,
    "\n      query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {\n         search(\n         input: {\n            collectionSlug: $slug,\n            groupByProduct: true,\n            skip: $skip,\n            take: $take }\n         ) {\n            totalItems\n            items {\n               productName\n               slug\n               productAsset {\n                  id\n                  preview\n               }\n               priceWithTax {\n                  ... on SinglePrice {\n                     value\n                  }\n                  ... on PriceRange {\n                     min\n                     max\n                  }\n               }\n               currencyCode\n            }\n         }\n      }\n   ": types.GetCollectionProductsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetProducts($options: ProductListOptions) {\n         products(options: $options) {\n            totalItems\n            items {\n               id\n               name\n               slug\n               description\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   "): (typeof documents)["\n      query GetProducts($options: ProductListOptions) {\n         products(options: $options) {\n            totalItems\n            items {\n               id\n               name\n               slug\n               description\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetTopLevelCollections {\n         collections(options: { topLevelOnly: true }) {\n            items {\n               id\n               slug\n               name\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   "): (typeof documents)["\n      query GetTopLevelCollections {\n         collections(options: { topLevelOnly: true }) {\n            items {\n               id\n               slug\n               name\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetCollections {\n         collections {\n            items {\n               id\n               slug\n               name\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   "): (typeof documents)["\n      query GetCollections {\n         collections {\n            items {\n               id\n               slug\n               name\n               featuredAsset {\n                  id\n                  preview\n               }\n            }\n         }\n      }\n   "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetCollection($slug: String!) {\n         collection(slug: $slug) {\n            id\n            name\n            slug\n            description\n            featuredAsset {\n               id\n               preview\n            }\n         }\n      }\n   "): (typeof documents)["\n      query GetCollection($slug: String!) {\n         collection(slug: $slug) {\n            id\n            name\n            slug\n            description\n            featuredAsset {\n               id\n               preview\n            }\n         }\n      }\n   "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {\n         search(\n         input: {\n            collectionSlug: $slug,\n            groupByProduct: true,\n            skip: $skip,\n            take: $take }\n         ) {\n            totalItems\n            items {\n               productName\n               slug\n               productAsset {\n                  id\n                  preview\n               }\n               priceWithTax {\n                  ... on SinglePrice {\n                     value\n                  }\n                  ... on PriceRange {\n                     min\n                     max\n                  }\n               }\n               currencyCode\n            }\n         }\n      }\n   "): (typeof documents)["\n      query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {\n         search(\n         input: {\n            collectionSlug: $slug,\n            groupByProduct: true,\n            skip: $skip,\n            take: $take }\n         ) {\n            totalItems\n            items {\n               productName\n               slug\n               productAsset {\n                  id\n                  preview\n               }\n               priceWithTax {\n                  ... on SinglePrice {\n                     value\n                  }\n                  ... on PriceRange {\n                     min\n                     max\n                  }\n               }\n               currencyCode\n            }\n         }\n      }\n   "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;