// All code for sending requests to backend is stored in this file
// The code is copied (and modified) from app-dev/security-examples/07-backend-frontend-jwt-auth

// Import REST API BASE URL from the environment variable, see .env file
// Note: all environment variables must start with REACT_, otherwise React will not handle them!
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Note - this is an abstraction layer for HTTP requests. You can implement this function in any way
// you want - with Axios, Fetch, ...

/**
 * Send an HTTP GET REST-API request to the backend
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
export function sendApiGetRequest(url, callback, errorCallback) {
    sendApiRequest("get", url, callback, null, errorCallback)
}

/**
 * Send an HTTP POST REST-API request to the backend
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param requestBody When supplied, send this data in the request body.
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
export function sendApiPostRequest(url, callback, requestBody, errorCallback) {
    sendApiRequest("post", url, callback, requestBody, errorCallback)
}

/**
 * Send an HTTP PUT REST-API request to the backend
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param requestBody When supplied, send this data in the request body.
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
export function sendApiPutRequest(url, callback, requestBody, errorCallback) {
    sendApiRequest("put", url, callback, requestBody, errorCallback)
}

/**
 * Send an HTTP GET REST-API request to the backend
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
export function sendApiDeleteRequest(url, callback, errorCallback) {
    sendApiRequest("delete", url, callback, null, errorCallback)
}

/**
 * Send an HTTP POST REST-API request with multipart form-data to the backend
 * @param url relative URL of the API endpoint
 * @param fileContent Content of the file to upload
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
export function sendApiFileUploadRequest(url, fileContent, callback, errorCallback) {
    sendApiRequest("post", url, callback, null, errorCallback, fileContent)
}


/**
 * Send a REST-API request to the backend, generic function
 * @param method The method to use: GET, POST, PUT, DELETE
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param requestBody When supplied, send this data in the request body. Does not work with HTTP GET!
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 * @param fileContent Content of a file to upload. Note: fileContent is only considered when requestBody is not specified!
 */
function sendApiRequest(method, url, callback, requestBody, errorCallback, fileContent) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let responseJson = "";
                if (request.responseText) {
                    try {
                        responseJson = JSON.parse(request.responseText);
                    } catch (e) {
                        responseJson = "";
                        // console.log(e);
                    }
                }
                callback(responseJson);
            } else if (errorCallback) {
                errorCallback(request.status, request.responseText);
            } else {
                console.error("Error in API request");
            }
        }
    };
    const fullUrl = API_BASE_URL + url;
    console.log("Sending request to " + fullUrl);
    request.open(method, fullUrl);

    // Set JWT token, if it is stored in a cookie
    // TODO - if you re-use this code, remember to include the JWT token, if necessary!
    // const jwtToken = getCookie("jwt");
    // if (jwtToken) {
    //     request.setRequestHeader("Authorization", "Bearer " + jwtToken);
    // }

    let dataToSend = null;
    // Do we need to include data in the request?
    if (requestBody) {
        if (method.toLowerCase() !== "get") {
            request.setRequestHeader('Content-Type', 'application/json');
            dataToSend = JSON.stringify(requestBody);
        } else {
            console.error("Trying to send request data with HTTP GET, not allowed!")
        }
    } else if (fileContent) {
        dataToSend = new FormData();
        dataToSend.append("fileContent", fileContent);
    }

    if (dataToSend) {
        request.send(dataToSend);
    } else {
        request.send();
    }
}
