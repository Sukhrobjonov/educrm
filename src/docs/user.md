## User Route Requests

#### 1. User Sign In Post Endpoint

##### Request

`SERVER_URL/users/sign_in`

Headers:
`Content-type: "application/json"`

Request body:

| Name     | Description                    | Type   | Required |
| -------- | ------------------------------ | ------ | -------- |
| username | User's username(5, 32, unique) | String | true     |
| password | User's password(5, 128)        | String | true     |

##### Response status codes

`201 - Token created successfully`

`400 - Username || Password is invalid`

`500 - Internal Server Error`

#### 2. User Create Post Endpoint

##### Request

`SERVER_URL/users/account`

Headers:

`Content-Type: "application/json"`
`Authorization: "TOKEN"`

Permissions:
`Admin`

Request body:

| Name     | Description                     | Type   | Required |
| -------- | ------------------------------- | ------ | -------- |
| name     | User's name(5, 64,)             | String | true     |
| username | User's username(5, 32, unique)  | String | true     |
| gender   | User's gender("male", "female") | ENUM   | true     |
| password | User's password(5, 128,)        | String | true     |

##### Response status codes

`201 - User created successfully`

`400 - Username || Password || Gender || Name is invalid`

`400 Username already exists`

`500 Internal Server Error`

#### User Get Endpoit

##### Request

`SERVER_URL/users/`

Headers:

`Content-Type: "application/json"`
`Authorization: "TOKEN"`

Permissions:

`Admin`

##### Response status codes:

`200 Users list`
`500 Internal Server Error`
