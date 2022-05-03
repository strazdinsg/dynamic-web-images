// Here we handle business logic for the products


import {sendApiGetRequest} from "./api-requests";

const FAKE_PRODUCTS = [
    {
        "id": 1,
        "name": "Jeans",
        "description": "Classic blue jeans for every situation of life (perhaps except weddings). No money back guarantee.",
        "price": 123,
        "imageId": 17
    },
    {
        "id": 2,
        "name": "Sneakers",
        "description": "Regular sneakers. Comfortable, available in all sizes and colors. Wear them to office, as well as to a digital meeting in MS Teams. Not meant for sneaking.",
        "price": 226.99
    },
    {
        "id": 3,
        "name": "T-shirt",
        "description": "A shirt that reminds everyone of 'green thinking'.",
        "price": 57
    },
];

// Pretend that these products are loaded from a backend

// Products loading takes 3 seconds
const PRODUCT_LOAD_TIMEOUT = 3000;

/**
 * Get products from the backend
 * @param callback A callback function called when products arrive from the backend, with products as the only argument
 * @param errorCallback A callback function called when the request failed
 * @return {Array}
 */
export function loadProductsFromServer(callback, errorCallback) {
    sendApiGetRequest("/products", callback, errorCallback);
}

export function deleteProductOnServer(productId, callback) {
    // TODO
    console.log("Deleting product on server...");
    if (callback) {
        callback();
    }
}

export function deleteProductImageOnServer(imageId, callback) {
    // TODO
    console.log(`Deleting product image ${imageId} on server...`);
    if (callback) {
        callback();
    }
}

export function saveProductOnServer(product, callback) {
    // TODO
    console.log("Sending product to server...");
    if (callback) {
        callback();
    }
}
