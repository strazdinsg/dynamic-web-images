// Here we handle business logic for images

import {sendApiDeleteRequest, sendApiFileUploadRequest} from "./api-requests";

const IMAGE_URL = "/images";

/**
 * Send a request to server to delete an image
 * @param imageId ID of the image to delete
 * @param callback Callback function to call when operation is successful
 * @param errorCallback Callback function to call the operation failed
 */
export function deleteImageOnServer(imageId, callback, errorCallback) {
    sendApiDeleteRequest(IMAGE_URL + "/" + imageId, callback, errorCallback);
}

/**
 * Upload an image to the server
 * @param image Image date
 * @param callback Callback function to call when operation is successful
 * @param errorCallback Callback function to call the operation failed
 */
export function uploadImageToServer(image, callback, errorCallback) {
    sendApiFileUploadRequest(IMAGE_URL, image, callback, errorCallback);
}
