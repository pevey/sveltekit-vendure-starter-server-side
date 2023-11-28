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
    "\n\t\tmutation AddItemToOrder($variantId: ID!, $quantity: Int!) {\n\t\t\taddItemToOrder(productVariantId: $variantId, quantity: $quantity) {\n\t\t\t\t__typename\n\t\t\t\t...UpdatedOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t\t... on InsufficientStockError {\n\t\t\t\t\tquantityAvailable\n\t\t\t\t\torder {\n\t\t\t\t\t\t...UpdatedOrder\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfragment UpdatedOrder on Order {\n\t\t\tid\n\t\t\tcode\n\t\t\tstate\n\t\t\ttotalQuantity\n\t\t\ttotalWithTax\n\t\t\tcurrencyCode\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.AddItemToOrderDocument,
    "\n\t\tmutation AddOrderCouponCode($couponCode: String!) {\n\t\t\tapplyCouponCode(couponCode: $couponCode) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.AddOrderCouponCodeDocument,
    "\n\t\tmutation AddOrderPayment($input: PaymentInput!) {\n\t\t\taddPaymentToOrder(input: $input) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.AddOrderPaymentDocument,
    "\n\t\tmutation CreateCustomerAddress($input: CreateAddressInput!) {\n\t\t\tcreateCustomerAddress(input: $input) {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tcompany\n\t\t\t\tstreetLine1\n\t\t\t\tstreetLine2\n\t\t\t\tcity\n\t\t\t\tprovince\n\t\t\t\tpostalCode\n\t\t\t\tcountry {\n\t\t\t\t\tid\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t\tphoneNumber\n\t\t\t\tdefaultShippingAddress\n\t\t\t\tdefaultBillingAddress\n\t\t\t}\n\t\t}\n\t": types.CreateCustomerAddressDocument,
    "\n\t\tmutation CreateStripePaymentIntent {\n\t\t\tcreateStripePaymentIntent\n\t\t}\n\t": types.CreateStripePaymentIntentDocument,
    "\n\t\tquery GetActiveOrder {\n\t\t\tactiveOrder {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\t\tfragment ActiveOrder on Order {\n\t\t\t__typename\n\t\t\tid\n\t\t\tcode\n\t\t\tcouponCodes\n\t\t\tstate\n\t\t\tcurrencyCode\n\t\t\ttotalQuantity\n\t\t\tsubTotal\n\t\t\tshipping\n\t\t\ttotal\n\t\t\ttotalWithTax\n\t\t\ttaxSummary {\n\t\t\t\tdescription\n\t\t\t\ttaxRate\n\t\t\t\ttaxBase\n\t\t\t\ttaxTotal\n\t\t\t}\n\t\t\tdiscounts {\n\t\t\t\tdescription\n\t\t\t\tamountWithTax\n\t\t\t}\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPrice\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePrice\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tslug\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t\tshippingLines {\n\t\t\t\tshippingMethod {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t\tpriceWithTax\n\t\t\t}\n\t\t}\n\t": types.GetActiveOrderDocument,
    "\n\t\tquery GetCollection($slug: String!) {\n\t\t\tcollection(slug: $slug) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t\tdescription\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetCollectionDocument,
    "\n\t\tquery GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {\n\t\t\tsearch(\n\t\t\tinput: {\n\t\t\t\tcollectionSlug: $slug,\n\t\t\t\tgroupByProduct: true,\n\t\t\t\tskip: $skip,\n\t\t\t\ttake: $take }\n\t\t\t) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tproductName\n\t\t\t\t\tslug\n\t\t\t\t\tproductAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tprice {\n\t\t\t\t\t\t... on SinglePrice {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t\t... on PriceRange {\n\t\t\t\t\t\t\tmin\n\t\t\t\t\t\t\tmax\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcurrencyCode\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetCollectionProductsDocument,
    "\n\t\tquery GetCollections {\n\t\t\tcollections {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetCollectionsDocument,
    "\n\t\tquery GetCustomer {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t}\n\t\t}\n\t": types.GetCustomerDocument,
    "\n\t\tquery GetCustomerAddresses {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\taddresses {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tcompany\n\t\t\t\t\tstreetLine1\n\t\t\t\t\tstreetLine2\n\t\t\t\t\tcity\n\t\t\t\t\tprovince\n\t\t\t\t\tpostalCode\n\t\t\t\t\tcountry {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\tphoneNumber\n\t\t\t\t\tdefaultShippingAddress\n\t\t\t\t\tdefaultBillingAddress\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetCustomerAddressesDocument,
    "\n\t\tquery GetOrderByCode($code: String!) {\n\t\t\torderByCode(code: $code) {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tstate\n\t\t\t\tlines {\n\t\t\t\t\tid\n\t\t\t\t\tquantity\n\t\t\t\t\tlinePriceWithTax\n\t\t\t\t\tproductVariant {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tsku\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\tslug\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetOrderByCodeDocument,
    "\n\t\tquery GetOrderPaymentMethods {\n\t\t\teligiblePaymentMethods {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tcode\n\t\t\t\tisEligible\n\t\t\t}\n\t\t}\n\t": types.GetOrderPaymentMethodsDocument,
    "\n\t\tquery GetOrderShippingMethods {\n\t\t\teligibleShippingMethods {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t": types.GetOrderShippingMethodsDocument,
    "\n\t\tquery GetProduct($slug: String!) {\n\t\t\tproduct(slug: $slug) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t\tassets {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t\tvariants {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tstockLevel\n\t\t\t\t\tcurrencyCode\n\t\t\t\t\tprice\n\t\t\t\t\tpriceWithTax\n\t\t\t\t\tfacetValues {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tfacet {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tassets {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetProductDocument,
    "\n\t\tquery GetProducts($options: ProductListOptions) {\n\t\t\tproducts(options: $options) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tslug\n\t\t\t\t\tdescription\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetProductsDocument,
    "\n\t\tquery GetTopLevelCollections {\n\t\t\tcollections(options: { topLevelOnly: true }) {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetTopLevelCollectionsDocument,
    "\n\t\tmutation RemoveItemFromOrder($orderLineId: ID!) {\n\t\t\tremoveOrderLine(orderLineId: $orderLineId) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.RemoveItemFromOrderDocument,
    "\n\t\tmutation RemoveOrderCouponCode($couponCode: String!) {\n\t\t\tremoveCouponCode(couponCode: $couponCode) {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\t": types.RemoveOrderCouponCodeDocument,
    "\n\t\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.RequestPasswordResetDocument,
    "\n\t\tmutation ResetPassword($token: String! $password: String!) {\n\t\t\tresetPassword(token: $token password: $password) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.ResetPasswordDocument,
    "\n\t\tquery SearchProducts($input: SearchInput!) {\n\t\t\tsearch(input: $input) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tproductName\n\t\t\t\t\tslug\n\t\t\t\t\tdescription\n\t\t\t\t\tproductAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tprice {\n\t\t\t\t\t\t... on SinglePrice {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t\t... on PriceRange {\n\t\t\t\t\t\t\tmin\n\t\t\t\t\t\t\tmax\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcurrencyCode\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.SearchProductsDocument,
    "\n\t\tmutation SetCustomerForOrder($input: CreateCustomerInput!) {\n\t\t\tsetCustomerForOrder(input: $input) {\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.SetCustomerForOrderDocument,
    "\n\t\tmutation SetOrderShippingAddress($input: CreateAddressInput!) {\n\t\t\t\tsetOrderShippingAddress(input: $input) {\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.SetOrderShippingAddressDocument,
    "\n\t\tmutation SetOrderShippingMethod($id: [ID!]!) {\n\t\t\tsetOrderShippingMethod(shippingMethodId: $id) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.SetOrderShippingMethodDocument,
    "\n\t\tmutation TransitionToState($state: String!) {\n\t\t\ttransitionOrderToState(state: $state) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on OrderStateTransitionError {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t\ttransitionError\n\t\t\t\t\tfromState\n\t\t\t\t\ttoState\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.TransitionToStateDocument,
    "\n\t\tmutation LogIn($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {\n\t\t\tlogin(username: $emailAddress, password: $password, rememberMe: $rememberMe) {\n\t\t\t\t... on  CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.LogInDocument,
    "\n\t\tmutation LogOut {\n\t\t\tlogout {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t}\n\t": types.LogOutDocument,
    "\n\t\tmutation Register($input: RegisterCustomerInput!) {\n\t\t\tregisterCustomerAccount(input: $input) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.RegisterDocument,
    "\n\t\tmutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n\t\t\tadjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\t\terrorCode\n\t\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.AdjustOrderLineDocument,
    "\n\t\tmutation Verify($token: String!) {\n\t\t\tverifyCustomerAccount(token: $token) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.VerifyDocument,
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
export function gql(source: "\n\t\tmutation AddItemToOrder($variantId: ID!, $quantity: Int!) {\n\t\t\taddItemToOrder(productVariantId: $variantId, quantity: $quantity) {\n\t\t\t\t__typename\n\t\t\t\t...UpdatedOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t\t... on InsufficientStockError {\n\t\t\t\t\tquantityAvailable\n\t\t\t\t\torder {\n\t\t\t\t\t\t...UpdatedOrder\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfragment UpdatedOrder on Order {\n\t\t\tid\n\t\t\tcode\n\t\t\tstate\n\t\t\ttotalQuantity\n\t\t\ttotalWithTax\n\t\t\tcurrencyCode\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation AddItemToOrder($variantId: ID!, $quantity: Int!) {\n\t\t\taddItemToOrder(productVariantId: $variantId, quantity: $quantity) {\n\t\t\t\t__typename\n\t\t\t\t...UpdatedOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t\t... on InsufficientStockError {\n\t\t\t\t\tquantityAvailable\n\t\t\t\t\torder {\n\t\t\t\t\t\t...UpdatedOrder\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfragment UpdatedOrder on Order {\n\t\t\tid\n\t\t\tcode\n\t\t\tstate\n\t\t\ttotalQuantity\n\t\t\ttotalWithTax\n\t\t\tcurrencyCode\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation AddOrderCouponCode($couponCode: String!) {\n\t\t\tapplyCouponCode(couponCode: $couponCode) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation AddOrderCouponCode($couponCode: String!) {\n\t\t\tapplyCouponCode(couponCode: $couponCode) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation AddOrderPayment($input: PaymentInput!) {\n\t\t\taddPaymentToOrder(input: $input) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation AddOrderPayment($input: PaymentInput!) {\n\t\t\taddPaymentToOrder(input: $input) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation CreateCustomerAddress($input: CreateAddressInput!) {\n\t\t\tcreateCustomerAddress(input: $input) {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tcompany\n\t\t\t\tstreetLine1\n\t\t\t\tstreetLine2\n\t\t\t\tcity\n\t\t\t\tprovince\n\t\t\t\tpostalCode\n\t\t\t\tcountry {\n\t\t\t\t\tid\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t\tphoneNumber\n\t\t\t\tdefaultShippingAddress\n\t\t\t\tdefaultBillingAddress\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation CreateCustomerAddress($input: CreateAddressInput!) {\n\t\t\tcreateCustomerAddress(input: $input) {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tcompany\n\t\t\t\tstreetLine1\n\t\t\t\tstreetLine2\n\t\t\t\tcity\n\t\t\t\tprovince\n\t\t\t\tpostalCode\n\t\t\t\tcountry {\n\t\t\t\t\tid\n\t\t\t\t\tcode\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t\tphoneNumber\n\t\t\t\tdefaultShippingAddress\n\t\t\t\tdefaultBillingAddress\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation CreateStripePaymentIntent {\n\t\t\tcreateStripePaymentIntent\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation CreateStripePaymentIntent {\n\t\t\tcreateStripePaymentIntent\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetActiveOrder {\n\t\t\tactiveOrder {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\t\tfragment ActiveOrder on Order {\n\t\t\t__typename\n\t\t\tid\n\t\t\tcode\n\t\t\tcouponCodes\n\t\t\tstate\n\t\t\tcurrencyCode\n\t\t\ttotalQuantity\n\t\t\tsubTotal\n\t\t\tshipping\n\t\t\ttotal\n\t\t\ttotalWithTax\n\t\t\ttaxSummary {\n\t\t\t\tdescription\n\t\t\t\ttaxRate\n\t\t\t\ttaxBase\n\t\t\t\ttaxTotal\n\t\t\t}\n\t\t\tdiscounts {\n\t\t\t\tdescription\n\t\t\t\tamountWithTax\n\t\t\t}\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPrice\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePrice\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tslug\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t\tshippingLines {\n\t\t\t\tshippingMethod {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t\tpriceWithTax\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetActiveOrder {\n\t\t\tactiveOrder {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\t\tfragment ActiveOrder on Order {\n\t\t\t__typename\n\t\t\tid\n\t\t\tcode\n\t\t\tcouponCodes\n\t\t\tstate\n\t\t\tcurrencyCode\n\t\t\ttotalQuantity\n\t\t\tsubTotal\n\t\t\tshipping\n\t\t\ttotal\n\t\t\ttotalWithTax\n\t\t\ttaxSummary {\n\t\t\t\tdescription\n\t\t\t\ttaxRate\n\t\t\t\ttaxBase\n\t\t\t\ttaxTotal\n\t\t\t}\n\t\t\tdiscounts {\n\t\t\t\tdescription\n\t\t\t\tamountWithTax\n\t\t\t}\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPrice\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePrice\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tslug\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t\tshippingLines {\n\t\t\t\tshippingMethod {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t\tpriceWithTax\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetCollection($slug: String!) {\n\t\t\tcollection(slug: $slug) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t\tdescription\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetCollection($slug: String!) {\n\t\t\tcollection(slug: $slug) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t\tdescription\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {\n\t\t\tsearch(\n\t\t\tinput: {\n\t\t\t\tcollectionSlug: $slug,\n\t\t\t\tgroupByProduct: true,\n\t\t\t\tskip: $skip,\n\t\t\t\ttake: $take }\n\t\t\t) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tproductName\n\t\t\t\t\tslug\n\t\t\t\t\tproductAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tprice {\n\t\t\t\t\t\t... on SinglePrice {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t\t... on PriceRange {\n\t\t\t\t\t\t\tmin\n\t\t\t\t\t\t\tmax\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcurrencyCode\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {\n\t\t\tsearch(\n\t\t\tinput: {\n\t\t\t\tcollectionSlug: $slug,\n\t\t\t\tgroupByProduct: true,\n\t\t\t\tskip: $skip,\n\t\t\t\ttake: $take }\n\t\t\t) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tproductName\n\t\t\t\t\tslug\n\t\t\t\t\tproductAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tprice {\n\t\t\t\t\t\t... on SinglePrice {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t\t... on PriceRange {\n\t\t\t\t\t\t\tmin\n\t\t\t\t\t\t\tmax\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcurrencyCode\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetCollections {\n\t\t\tcollections {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetCollections {\n\t\t\tcollections {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetCustomer {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetCustomer {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetCustomerAddresses {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\taddresses {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tcompany\n\t\t\t\t\tstreetLine1\n\t\t\t\t\tstreetLine2\n\t\t\t\t\tcity\n\t\t\t\t\tprovince\n\t\t\t\t\tpostalCode\n\t\t\t\t\tcountry {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\tphoneNumber\n\t\t\t\t\tdefaultShippingAddress\n\t\t\t\t\tdefaultBillingAddress\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetCustomerAddresses {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\taddresses {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tcompany\n\t\t\t\t\tstreetLine1\n\t\t\t\t\tstreetLine2\n\t\t\t\t\tcity\n\t\t\t\t\tprovince\n\t\t\t\t\tpostalCode\n\t\t\t\t\tcountry {\n\t\t\t\t\t\tcode\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\tphoneNumber\n\t\t\t\t\tdefaultShippingAddress\n\t\t\t\t\tdefaultBillingAddress\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetOrderByCode($code: String!) {\n\t\t\torderByCode(code: $code) {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tstate\n\t\t\t\tlines {\n\t\t\t\t\tid\n\t\t\t\t\tquantity\n\t\t\t\t\tlinePriceWithTax\n\t\t\t\t\tproductVariant {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tsku\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\tslug\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetOrderByCode($code: String!) {\n\t\t\torderByCode(code: $code) {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tstate\n\t\t\t\tlines {\n\t\t\t\t\tid\n\t\t\t\t\tquantity\n\t\t\t\t\tlinePriceWithTax\n\t\t\t\t\tproductVariant {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tsku\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\tslug\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetOrderPaymentMethods {\n\t\t\teligiblePaymentMethods {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tcode\n\t\t\t\tisEligible\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetOrderPaymentMethods {\n\t\t\teligiblePaymentMethods {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tcode\n\t\t\t\tisEligible\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetOrderShippingMethods {\n\t\t\teligibleShippingMethods {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetOrderShippingMethods {\n\t\t\teligibleShippingMethods {\n\t\t\t\tid\n\t\t\t\tcode\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetProduct($slug: String!) {\n\t\t\tproduct(slug: $slug) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t\tassets {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t\tvariants {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tstockLevel\n\t\t\t\t\tcurrencyCode\n\t\t\t\t\tprice\n\t\t\t\t\tpriceWithTax\n\t\t\t\t\tfacetValues {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tfacet {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tassets {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetProduct($slug: String!) {\n\t\t\tproduct(slug: $slug) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t\tassets {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t\tvariants {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tstockLevel\n\t\t\t\t\tcurrencyCode\n\t\t\t\t\tprice\n\t\t\t\t\tpriceWithTax\n\t\t\t\t\tfacetValues {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tfacet {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tassets {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetProducts($options: ProductListOptions) {\n\t\t\tproducts(options: $options) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tslug\n\t\t\t\t\tdescription\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetProducts($options: ProductListOptions) {\n\t\t\tproducts(options: $options) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tslug\n\t\t\t\t\tdescription\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetTopLevelCollections {\n\t\t\tcollections(options: { topLevelOnly: true }) {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetTopLevelCollections {\n\t\t\tcollections(options: { topLevelOnly: true }) {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tslug\n\t\t\t\t\tname\n\t\t\t\t\tfeaturedAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation RemoveItemFromOrder($orderLineId: ID!) {\n\t\t\tremoveOrderLine(orderLineId: $orderLineId) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation RemoveItemFromOrder($orderLineId: ID!) {\n\t\t\tremoveOrderLine(orderLineId: $orderLineId) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation RemoveOrderCouponCode($couponCode: String!) {\n\t\t\tremoveCouponCode(couponCode: $couponCode) {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation RemoveOrderCouponCode($couponCode: String!) {\n\t\t\tremoveCouponCode(couponCode: $couponCode) {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation ResetPassword($token: String! $password: String!) {\n\t\t\tresetPassword(token: $token password: $password) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation ResetPassword($token: String! $password: String!) {\n\t\t\tresetPassword(token: $token password: $password) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery SearchProducts($input: SearchInput!) {\n\t\t\tsearch(input: $input) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tproductName\n\t\t\t\t\tslug\n\t\t\t\t\tdescription\n\t\t\t\t\tproductAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tprice {\n\t\t\t\t\t\t... on SinglePrice {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t\t... on PriceRange {\n\t\t\t\t\t\t\tmin\n\t\t\t\t\t\t\tmax\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcurrencyCode\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery SearchProducts($input: SearchInput!) {\n\t\t\tsearch(input: $input) {\n\t\t\t\ttotalItems\n\t\t\t\titems {\n\t\t\t\t\tproductName\n\t\t\t\t\tslug\n\t\t\t\t\tdescription\n\t\t\t\t\tproductAsset {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tpreview\n\t\t\t\t\t}\n\t\t\t\t\tprice {\n\t\t\t\t\t\t... on SinglePrice {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t\t... on PriceRange {\n\t\t\t\t\t\t\tmin\n\t\t\t\t\t\t\tmax\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcurrencyCode\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation SetCustomerForOrder($input: CreateCustomerInput!) {\n\t\t\tsetCustomerForOrder(input: $input) {\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation SetCustomerForOrder($input: CreateCustomerInput!) {\n\t\t\tsetCustomerForOrder(input: $input) {\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation SetOrderShippingAddress($input: CreateAddressInput!) {\n\t\t\t\tsetOrderShippingAddress(input: $input) {\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation SetOrderShippingAddress($input: CreateAddressInput!) {\n\t\t\t\tsetOrderShippingAddress(input: $input) {\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation SetOrderShippingMethod($id: [ID!]!) {\n\t\t\tsetOrderShippingMethod(shippingMethodId: $id) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation SetOrderShippingMethod($id: [ID!]!) {\n\t\t\tsetOrderShippingMethod(shippingMethodId: $id) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation TransitionToState($state: String!) {\n\t\t\ttransitionOrderToState(state: $state) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on OrderStateTransitionError {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t\ttransitionError\n\t\t\t\t\tfromState\n\t\t\t\t\ttoState\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation TransitionToState($state: String!) {\n\t\t\ttransitionOrderToState(state: $state) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t...on OrderStateTransitionError {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t\ttransitionError\n\t\t\t\t\tfromState\n\t\t\t\t\ttoState\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation LogIn($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {\n\t\t\tlogin(username: $emailAddress, password: $password, rememberMe: $rememberMe) {\n\t\t\t\t... on  CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation LogIn($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {\n\t\t\tlogin(username: $emailAddress, password: $password, rememberMe: $rememberMe) {\n\t\t\t\t... on  CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation LogOut {\n\t\t\tlogout {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation LogOut {\n\t\t\tlogout {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation Register($input: RegisterCustomerInput!) {\n\t\t\tregisterCustomerAccount(input: $input) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation Register($input: RegisterCustomerInput!) {\n\t\t\tregisterCustomerAccount(input: $input) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n\t\t\tadjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\t\terrorCode\n\t\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n\t\t\tadjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n\t\t\t\t...ActiveOrder\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\t\terrorCode\n\t\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation Verify($token: String!) {\n\t\t\tverifyCustomerAccount(token: $token) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation Verify($token: String!) {\n\t\t\tverifyCustomerAccount(token: $token) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;