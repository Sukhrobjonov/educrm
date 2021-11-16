## Group Route Requests

#### 1. Group Student Post Endpoint

##### Request

`SERVER_URL/students`

Headers:
`Content-type: "application/json"`

`Authorizatin: "TOKEN"`

Permissions: `Admin, Operator Teacher`

Request body:

| Name         | Description    | Type   | Required |
| ------------ | -------------- | ------ | -------- |
| applicant id | Applicant's id | Uuid   | true     |
| group id     | Group's id     | Number | true     |

##### Response status codes

`201 - Student created successfully`

`400 - Applicant || Group id is invalid`

`404 - Group || Applicant not found`

`500 - Internal Server Error`

#### 2. Applicant Get Endpoit

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

`200 - Students list`

`500 - Internal Server Error`
