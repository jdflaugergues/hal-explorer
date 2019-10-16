# Authors

---
	
- GET /authors
- GET /authors/:authorsId
- POST /authors
- PUT /authors/:authorsId
- PATCH /authors/:authorsId
- DELETE /authors/:authorsId

## GET */authors*
Get all authors

### Request

#### Headers
- `Content-Type`: `application/hal+json`
- `Range`: (_optional_) [Range Pagination Headers](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) to precise a range of data to request. For Example `authors 0-9` will get the 10 first authors.

#### Parameters
- `q`: (_optional_) Parameter allowing to filter the requested resources. It must respected the JSON format. The JSON key match the field of the table and the JSON value the field value to filter. Example : `/authors?q={"age": 30}`
- `range`: (_optional_) Parameter allowing to replace `Range` header. Its value does not contains resource unit. Example : `/authors?range=0-9`


#### Body
None

### Responses

##### Headers:
  - `Accepted-Ranges`: The name of the resources returned (`authors`).
  - `Content-Range`: The resource range returned. Example `authors 0-*/64`. If the total number of resources is unknown, a `*` is used. 

#### 200 OK

Example Value :
```
{
  "count": 1,
  "totalCount": 1,
  "_embedded": {
    "authors": [
      {
        "_id": "5da32e3d8b426d9e4c99a587",
        "age": 27,
        "name": "Allyson Dixon",
        "gender": "female",
        "company": "SECURIA",
        "email": "allysondixon@securia.com",
        "phone": "+1 (919) 418-2391",
        "address": "128 Madoc Avenue, Camas, Rhode Island, 2873",
        "_links": {
          "self": {
            "href": "/api/authors/5da32e3d8b426d9e4c99a587"
          }
        }
      }
    ]
  },
  "_links": {
     "self": { "href": "/api/kyc/authors?range=0-0" }
  }
}    
```

#### 206 Partial Content
This is used when server is only sending a portion of the requested resource because the author requested to only receive a portion of the resource using the `Range` header or when the resource is too large to be sent in one request.
The response body is the same as with 200 status adding `_links` in the corresponding cases (`first`, `prev`, `next`, `last`);

Example Value :
```
{
  "count": 10,
  "totalCount": 64,
  "_embedded": {
    "authors": [
      // ...
    ]
  },
  "_links": {
    "first": { "href": "/api/kyc/authors?range=0-9" }
    "prev": { "href": "/api/kyc/authors?range=30-39" }
    "self": { "href": "/api/kyc/authors?range=40-49" }
    "next": { "href": "/api/kyc/authors?range=50-59" }
    "last": { "href": "/api/kyc/authors?range=60-63" }
  }
}
```


#### 400 Bad Request
Example Value :
```
{ 
  code: 400,
  status: 'INVALID_ARGUMENT',
  message: 'q parameter must be a valid JSON'
}
```

#### 412 Precondition Failed
The precondition given in `Range` header is evaluated to false.

Example Value :
```
{ 
  code: 412,
  status: 'MALFORMED_RANGE',
  message: 'The range syntax is wrong, it must respected "<unit>=<range-start>-<range-end>". (Range sent: "authors=bad-syntax")'
}
```

#### 416 Requested Range Not Satisfiable
None of the range-specifier values in `Range` header overlap the current extent of the selected resource.

Example Value :
```
{
  code: 416,
  status: 'RANGE_NOT_SATISFIABLE',
  message: 'The "range-start" position (50) must be lower than number of resources (26)'
}
```
---

## GET */authors/:authorId*
Get an author 

### Request

#### Headers
- `Content-Type`: `application/hal+json`

#### Parameters
None

#### Body
None

### Responses

#### 200 Ok

##### Headers:
None

Example Value :
```
{
  "_id": "5da32e3d8b426d9e4c99a587",
  "age": 27,
  "name": "Allyson Dixon",
  "gender": "female",
  "company": "SECURIA",
  "email": "allysondixon@securia.com",
  "phone": "+1 (919) 418-2391",
  "address": "128 Madoc Avenue, Camas, Rhode Island, 2873",
  "_links": {
    "self": {
      "href": "/api/authors/5da32e3d8b426d9e4c99a587"
    }
  }
}
```
---

## POST */author*
Create a new author

### Request

#### Headers
- `Content-Type`: `application/hal+json`

#### Parameters
None

#### Body
Example value
```
{
  "age": 39,
  "name": "Casey Castro",
  "gender": "female",
  "company": "PROVIDCO",
  "email": "caseycastro@providco.com",
  "phone": "+1 (965) 455-2977",
  "address": "257 Furman Avenue, Guthrie, Georgia, 7909",
}
```

### Responses

#### 201 Created

##### Headers:
  - `Location`: URI of the created user

Example Value :
```
{
  "_id": "5da32e3d2c6dc482882497d4",
  "age": 39,
  "name": "Casey Castro",
  "gender": "female",
  "company": "PROVIDCO",
  "email": "caseycastro@providco.com",
  "phone": "+1 (965) 455-2977",
  "address": "257 Furman Avenue, Guthrie, Georgia, 7909",
  "_links": {
    "self": {
      "href": "/api/authors/5da32e3d2c6dc482882497d4"
    }
  }
}
```

#### 400 Invalid Argument

Example Value :
```
{ 
  code: 400,
  status: 'INVALID_ARGUMENT',
  message: 'Missing body'
}
```

## PUT */authors/:authorId*
Replace an author.

### Request

#### Headers
- `Content-Type`: `application/hal+json`

#### Parameters
None

#### Body
Example value
```
{
  "age": 38,
  "name": "Terrell Burns"
}
```

### Responses

#### 200 Ok

##### Headers:
None

Example Value :
```
{
  "_id": "5da32e3d5a65daf09970af6d",
  "age": 38,
  "name": "Terrell Burns"
  "_links": {
    "self": {
      "href": "/api/authors/5da32e3d5a65daf09970af6d"
    }
  }
}
```
---

## PATCH */authors/:authorId*
Update an author.

### Request

#### Headers
- `Content-Type`: `application/hal+json`

#### Parameters
None

#### Body
Example value
```
{
  "email": "newEmail@securia.com"
}
```

### Responses

#### 200 Ok

##### Headers:
None

Example Value :
```
{
  "_id": "5da32e3d8b426d9e4c99a587",
  "age": 27,
  "name": "Allyson Dixon",
  "gender": "female",
  "company": "SECURIA",
  "email": "newEmail@securia.com",
  "phone": "+1 (919) 418-2391",
  "address": "128 Madoc Avenue, Camas, Rhode Island, 2873",
  "_links": {
    "self": {
      "href": "/api/authors/5da32e3d8b426d9e4c99a587"
    }
  }
}
```
---

## DELETE */authors/:authorId*
Remove an author

### Request

#### Headers
- `Content-Type`: `application/hal+json`

#### Parameters
None

#### Body
None

### Responses

#### 204 OK

##### Headers:

```
