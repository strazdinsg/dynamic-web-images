# Image-upload backend

This is the backend part of image handling example, implemented in Spring Boot.

The backend provides the following functionality:

* Storage of a list of products, with CRUD operations:
    * Get all products: HTTP GET `/products`
    * Add a product: HTTP PUT `/products`, returns newly stored product ID
    * Update details of one product: HTTP POST `/products/{id}`
    * Delete a product: HTTP DELETE `/products/{id}`
* Image handling:
    * Upload: HTTP POST `/images`, returns newly stored image ID
    * Delete: HTTP DELETE `/images/{id}`
    * Get image file content: HTTP GET `/images/{id}`

Project is used as a demo in the
courses [IDATA2301 Web technologies](https://www.ntnu.edu/studies/courses/IDATA2301)
and [IDATA2306 Application development](https://www.ntnu.edu/studies/courses/IDATA2306) taught
at [NTNU](https://www.ntnu.edu).