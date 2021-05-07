
# QohashDirectory Listing

This repository contains the documentation for Project QohashDirectory backedn and frontend.

#### Contents

- [Overview](#1-overview)
- [Setup and installing the project](#2-authentication)
  - [Running the project](#21-browser-based-authentication)
  - [APIs](#22-self-issued-access-tokens)
  - [Libraries](#22-self-issued-access-tokens)
- [Resources](#3-resources)
- [Testing](#4-testing)
- [Deployment and Production Readiness Reviews](#4-testing)

## 1. Overview

The project directory contains 2 important folders:

    1. qohashdir-backend
    2. qohashdir-frontend

The backend is written in nodejs 12 and frontend is build no top of react version 17.0.2.

## 2. Setup and installing the project

In order to setup the project, you may copy/paste the project in any directory and make sure you have the node 12 and above version running on you computer. 


### 2.1 Running the project

1.  Open two separate terminal and navigate to the  **qohashdir-backend**  directory and run following command. You will notice that the backend server will start on the port 3001.
>     npm install
>     npm run start

2.  You can open the browser to the following Url to see if the backend works fine http://localhost:3001/test
3.  Next step cd into the **qohashdir-frontend** directory and run the following command 
 >     npm install
>     npm run start
4.  You will notice that the app will take some time to compile for the first run and it will open the browser tab automatically, if not please feel to open the http://localhost:3000/ ul on your browser.

### 2.2 APIs

The application is build on two main apis
>     http://localhost:3001/api/v1/directory/getfiles - Get File Details
>     http://localhost:3001/api/v1/directory/getListing - Get Listing

1.  Make a POST request to the  [`GetFileDetails`](http://localhost:3001/api/v1/directory/getfiles).
	Request:

>     curl --location --request POST 'http://localhost:3001/api/v1/directory/getfiles' \
>     --header 'Content-Type: application/json' \
>     --data-raw '{
>         "directory": "<your directory>"
>     }'
With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `directory`          | string   | required   | The directory you need to input as a user with a trailing slash |
Example Response:
> { "totalSize":  integer, "totalFiles":  integer }

2.  Make a POST request to the  [`GetListing`](http://localhost:3001/api/v1/directory/getListing).
	Request:

>     curl --location --request POST 'http://localhost:3001/api/v1/directory/getListing' \
>     --header 'Content-Type: application/json' \
>     --data-raw '{
>         "directory": "<your directory>"
>     }'
With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `directory`          | string   | required   | The directory you need to input as a user with a trailing slash |
Example Response:
> {
> "name":  "string",
> "type":  "string",
> "size": integer,
> "modifiedTime":  "string UTC Z time format"
> },
> {
> "name":  "string",
> "type":  "string",
> "size":  integer,
> "modifiedTime":  "string UTC Z time format"
> }
> ]

### 2.3 Additional Libraries
_Carbon_ is the design system for IBM web and product (Open Source). It is a series of individual styles, _components_, and guidelines used for creating unified UI. ([Apache-2.0 License](https://github.com/carbon-design-system/carbon/blob/main/LICENSE))
1. @carbon/charts-react: 0.41.62,
2. @carbon/elements: ^10.33.0,
3. @carbon/icons-react: ^10.31.0,
4. @carbon/pictograms-react": ^11.9.0,
5. carbon-components: ^10.34.0,
6. carbon-components-react: ^7.34.0,
7. carbon-icons: ^7.0.7,

Other important libraries:
"d3": "5.12.0",
"d3-array": "^2.12.1

## 3. Resources

 1. https://github.com/carbon-design-system/carbon
 2. https://www.carbondesignsystem.com/guidelines/icons/library/

## 4. Deployment and Production Readiness Reviews
There is still lot work that needs to be done. 
1. Appropriate validations
2. Backend error messaging
3. Logging Mechanisms
4. Unit testing and integration testing
5. CI/CD pipelines
6. SonarQube vulnerability scanner
7. Load testing for APIs
8. Swagger page for APIs
9. API auth mechanism
