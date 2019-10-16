# Books

---
	
- GET /books
- GET /books/:booksId

## GET */books*
Get all books

### Request

#### Headers
- `Content-Type`: `application/hal+json`
- `Range`: (_optional_) [Range Pagination Headers](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) to precise a range of data to request. For Example `books 0-9` will get the 10 first books.

#### Parameters
- `q`: (_optional_) Parameter allowing to filter the requested resources. It must respected the JSON format. The JSON key match the field of the table and the JSON value the field value to filter. Example : `/books?q={"name": "Computer Programming: Fundamentals for Absolute Beginners"}`
- `range`: (_optional_) Parameter allowing to replace `Range` header. Its value does not contains resource unit. Example : `/books?range=0-9`


#### Body
None

### Responses

##### Headers:
  - `Accepted-Ranges`: The name of the resources returned (`books`).
  - `Content-Range`: The resource range returned. Example `books 0-4/5`. If the total number of resources is unknown, a `*` is used. 

#### 200 OK

Example Value :
```
{
  "count": 1,
  "totalCount": 1,
  "_embedded": {
    "books": [
      {
        "_id": "5da32e3d8b426d9e4c99aa79",
        "authorId": "5da32e3d8b426d9e4c99a587",
        "name": "Computers Made Easy: From Dummy To Geek",
        "price": 14.24,
        "_links": {
          "self": {
            "href": "/api/books/5da32e3d8b426d9e4c99aa79"
          },
          "author": {
            "href": "/api/authors/5da32e3d8b426d9e4c99a587"
          }
        }
      }
    ]
  },
  "_links": {
     "self": { "href": "/api/kyc/books?range=0-0" }
  }
}    
```

#### 206 Partial Content
This is used when server is only sending a portion of the requested resource because the book requested to only receive a portion of the resource using the `Range` header or when the resource is too large to be sent in one request.
The response body is the same as with 200 status adding `_links` in the corresponding cases (`first`, `prev`, `next`, `last`);

Example Value :
```
{
  "count": 10,
  "totalCount": 64,
  "_embedded": {
    "books": [
      // ...
    ]
  },
  "_links": {
    "first": { "href": "/api/kyc/books?range=0-9" }
    "prev": { "href": "/api/kyc/books?range=30-39" }
    "self": { "href": "/api/kyc/books?range=40-49" }
    "next": { "href": "/api/kyc/books?range=50-59" }
    "last": { "href": "/api/kyc/books?range=60-63" }
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
  message: 'The range syntax is wrong, it must respected "<unit>=<range-start>-<range-end>". (Range sent: "books=bad-syntax")'
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

## GET */books/:bookId*
Get a book 

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
  "_id": "5da32e3d8b426d9e4c99aa79",
  "authorId": "5da32e3d8b426d9e4c99a587",
  "name": "Computers Made Easy: From Dummy To Geek",
  "price": 14.24,
  "_links": {
    "self": {
      "href": "/api/books/5da32e3d8b426d9e4c99aa79"
    },
    "author": {
      "href": "/api/authors/5da32e3d8b426d9e4c99a587"
    }
  }
}
```
---
