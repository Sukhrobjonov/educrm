## Teacher Route Requests

#### 1. Teacher Create Post Endpoint

##### Request

`SERVER_URL/teachers/`

Headers:

`Content-type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin`

Request body:

| Name    | Description         | Type   | Required |
| ------- | ------------------- | ------ | -------- |
| user_id | User's id           | uuid   | true     |
| phone   | User's phone(regax) | String | true     |
| skills  | User's skills(2,32) | Array  | true     |

##### Response status codes

`201 - Teacher created successfully`

`400 - User id || Phone || Skills is invalid`

`400 - This user is already teacher`

`500 - Internal Server Error`

#### 2. Teacher Update Put Endpoint

##### Request

`SERVER_URL/teachers/:teacher_id`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin`

Request body:

| Name    | Description         | Type   | Required |
| ------- | ------------------- | ------ | -------- |
| user_id | User's id           | uuid   | true     |
| phone   | User's phone(regax) | String | true     |
| skills  | User's skills(2,32) | Array  | true     |

##### Response status codes

`201 - Updated successfully`

`400 - User id || Phone || Skills is invalid`

`404 - Teacher not found`

`500 - Internal Server Error`

#### 3. Teacher Get Endpoint

##### Request

`SERVER_URL/teachers/`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin`

Query body:

| Name   | Description | Type   | Required |
| ------ | ----------- | ------ | -------- |
| order  | DESC ,ASC   | String | false    |
| limit  | 15          | Number | false    |
| offset | 0           | Number | false    |

##### Response status codes

`200 - Teachers list`

`500 - Internal Server Error`

#### 4. Teacher Delete Endpoint

##### Request

`SERVER_URL/teachers/:teacher_id`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin`

##### Response status codes

`200 - Deleted succsessfully`

`500 - Internal Server Error`
