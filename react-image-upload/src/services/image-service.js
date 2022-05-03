// Here we handle business logic for images

import {sendApiDeleteRequest} from "./api-requests";

const IMAGE_URL = "/images";

export function deleteImageOnServer(imageId, callback, errorCallback) {
    sendApiDeleteRequest(IMAGE_URL + "/" + imageId, callback, errorCallback);
}
