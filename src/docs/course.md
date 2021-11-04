## Course Route Requests

#### 1. Course Create Post Endpoint

##### Request

`SERVER_URL/courses/`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin`

Request body:

| Name        | Description            | Type   | Required |
| ----------- | ---------------------- | ------ | -------- |
| name        | Course name(8, 128)    | String | true     |
| description | Course description(64) | String | true     |
| price       | Course price           | Number | true     |
| photo       | Course photo           | File   | false    |

##### Response status codes

`201 - Course created successfully`

`400 - Size of photo must be less than 5 mb`

`400 - Name || Description || price || is invalid`

`500 - Internal Server Error`

#### 2. Course Update Put Endpoint

##### Request

`SERVER_URL/courses/:course_id`

Headers:

`Content-Type: application/`

`Authorization: "TOKEN"`

Permissions: `Admin`

Request body:

| Name        | Description            | Type   | Required |
| ----------- | ---------------------- | ------ | -------- |
| name        | Course name(8, 128)    | String | true     |
| description | Course description(64) | String | true     |
| price       | Course price           | Number | true     |
| photo       | Course photo           | File   | false    |

##### Response status codes

`200 - Course updated successfully`

`400 - Name || Description || Price is invalid`

`400 - Size of photo must be less than 5 mb`

`404 - Course not found`

`500 - Internal Server Error`

#### 3. Course Get Endpoint

##### Request

`SERVER_URL/courses/`

Headers: `Content-Type: "application/json"`

Query body:

| Name   | Description | Type   | Required |
| ------ | ----------- | ------ | -------- |
| order  | DESC, ASC   | String | false    |
| limit  | 15          | Number | false    |
| offset | 0           | Number | false    |

##### Response status codes

`200 - Course list`

`500 - Internal Server Error`

#### 4. Course Get One Endpoint

##### Request

`SERVER_URL/courses/:course_id`

Headers: `Content-Type: "application/json"`

##### Response status codes

`200 - Course`

`500 - Internal Server Error`

#### 5. Course Delete Endpoint

##### Request

`SERVER_URL/courses/:course_id`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin`

##### Response status codes

`200 - Course deleted successfully`

`500 - Internal Server Error`
