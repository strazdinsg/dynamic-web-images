// Here we handle business logic for products

import {sendApiDeleteRequest, sendApiGetRequest, sendApiPostRequest, sendApiPutRequest} from "./api-requests";

const PRODUCT_URL = "/products";
/**
 * Get products from the backend
 * @param callback Function to call on success
 * @param errorCallback Function to call on error
 * @return {Array}
 */
export function loadProductsFromServer(callback, errorCallback) {
    sendApiGetRequest(PRODUCT_URL, callback, errorCallback);
}

/**
 * Send request to the server - delete a product
 * @param productId ID of the product to delete
 * @param callback Function to call on success
 * @param errorCallback Function to call on error
 */
export function deleteProductOnServer(productId, callback, errorCallback) {
    sendApiDeleteRequest(PRODUCT_URL + "/" + productId, callback, errorCallback);
}

/**
 * Send request to the server - save product
 * @param product The product to save
 * @param callback Function to call on success
 * @param errorCallback Function to call on error
 */
export function updateProductOnServer(product, callback, errorCallback) {
    sendApiPutRequest(PRODUCT_URL + "/" + product.id, callback, product, errorCallback);
}

/**
 * Send request to the server - add a new product
 * @param product The product to add
 * @param callback Function to call on success
 * @param errorCallback Function to call on error
 */
export function addProductOnServer(product, callback, errorCallback) {
    sendApiPostRequest(PRODUCT_URL, callback, product, errorCallback);
}
