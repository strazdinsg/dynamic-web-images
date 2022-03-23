# Introduction

For any dynamic website developers face a challenge - how do I handle dynamic images on the site? For example, when the
user is allowed to change profile picture; or when administrator can upload custom images for products. The problem can
be broken down into three steps:

1. Image upload
2. Image storage
3. Image download (display)

## Image upload

Upload can be done either as a regular HTTP POST (with refresh of the whole site), or using asynchronous Javascript
request (Ajax).

When using Javascript for image upload, there are also several options, depending on what frameworks and libraries you
use:

1. Plain Javascript
2. Fetch API
3. Axios library

## Image storage

When it comes to storing the images, one has several options as well:

1. Files on the file system of a server (backend)
2. SQL database
3. noSQL database, such as MongoDB
4. Blob storage in cloud services such
   as [Amazon S3](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html)
   or [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-upload-process-images)

## Image download

When the image is stored on a server, you also need to find out how to download it - display it on the site. The
solution depends on where you store the image and what languages, frameworks and tools you use for the backend.

Several options here as well:

1. Serving images using a web-server process such as Nginx or Apache
2. Serving images with your custom backend web-application such as Spring Boot or Django
3. Serving images from a cloud storage (if you store the images on an external cloud service)

## Example case study

The solutions you choose depends on the whole structure of your project, of course. Here we describe an example, with a
specific configuration. This is the suggested way to handle image upload in the
courses [IDATA2301 Web technologies](https://www.ntnu.edu/studies/courses/IDATA2301)
and [IDATA2306 Application development](https://www.ntnu.edu/studies/courses/IDATA2306) taught
at [NTNU](https://www.ntnu.edu). 

### Image upload
TBD

### Image storage
TBD

### Image download
TBD