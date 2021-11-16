## Group Route Requests

#### 1. Applicant Post Endpoint

##### Request

`SERVER_URL/groups`

Headers:
`Content-type: "application/json"`

`Authorizatin: "TOKEN"`

Permissions: `Admin, Operator Teacher`

Request body:

| Name            | Description             | Type   | Required |
| --------------- | ----------------------- | ------ | -------- |
| time            | Group's time(5, 5)      | String | true     |
| schedule        | Group's schedule(2, 32) | Array  | true     |
| lesson duration | Lesson duration(0)      | Number | true     |
| course duration | Course duration(0)      | Number | true     |
| teacher id      | Group's teacher id      | Uuid   | true     |
| course id       | Group's course id       | Uuid   | true     |

##### Response status codes

`201 - Group created successfully`

`400 - Time || Schedule || Lesson duration || Course duration || Teacher id || Course id is invalid`

`404 - Course || Teacher not found`

`500 - Internal Server Error`

#### 2. Group Update Put Endpoint

##### Request

`SERVER_URL/groups/:group_id`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin, Operator, Teacher`

Request body:

| Name            | Description             | Type   | Required |
| --------------- | ----------------------- | ------ | -------- |
| time            | Group's time(5, 5)      | String | false    |
| schedule        | Group's schedule(2, 32) | Array  | false    |
| lesson duration | Lesson duration(0)      | Number | false    |
| course duration | Course duration(0)      | Number | false    |
| teacher id      | Group's teacher id      | Uuid   | false    |
| course id       | Group's course id       | Uuid   | false    |

##### Response status codes

`200 - Group updated successfully`

`400 - Time || Schedule || Lesson duration || Course duration || Teacher id || Course id is invalid`

`404 - Course || Teacher || Group not found`

`500 - Internal Server Error`

#### 3. Group Update One Get Endpoint

##### Request

`SERVER_URL/groups/:group_id`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin, Operator, Teacher`

##### Response status codes

`200 - Group updated successfully`

`404 - Group not found`

`500 - Internal Server Error`

#### 4. Applicant Get Endpoit

##### Request

`SERVER_URL/groups`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin Operator Teacher`

Query body:

| Name   | Description | Type   | Required |
| ------ | ----------- | ------ | -------- |
| order  | DESC ,ASC   | String | false    |
| limit  | 15          | Number | false    |
| offset | 0           | Number | false    |

##### Response status codes:

`200 - Groups list`

`500 - Internal Server Error`
