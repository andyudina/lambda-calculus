# Calculus
Simple calculator service for AWS Lambda with nodejs execution environment

## Getting started

How to install and run locally

### Prerequisites

1. Install Nodejs https://nodejs.org/en/download/
2. Install aws-sam-cli to run AWS API Gateway and AWS Lambda locally https://github.com/awslabs/aws-sam-cli/blob/develop/docs/installation.rst

### Installing

1. Clone this repo ```git clone git@github.com:andyudina/lambda-calculus.git```
2. Install dependencies with npm ```npm install```

## Run locally

1. Build lambda package ```npm run build```
2. Start docker daemon for aws-sam-cli
3. Run app using aws-sam-cli ```npm run-script run```

## Use app

Service accepts GET requests on url /calculus.

Query parameter "query" is required. Query is expected to be UTF-8 with BASE64 encoding.

Supports operations: + - * / ( ). Supports space as delimiter.

**Successfull response:**
```json
{ 
  "error": false, 
  "result": "number"
}
```
**Error response:**
```json
{ 
  "error": true, 
  "message": "string"
}
```

  
