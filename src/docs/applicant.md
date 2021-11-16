## Applicant Route Requests

#### 1. Applicant Post Endpoint

##### Request

`SERVER_URL/applicants/:course_id`

Headers:
`Content-type: "application/json"`

`Authorizatin: "TOKEN"`

Permissions: `Admin, Operator`

Request body:

| Name        | Description                          | Type   | Required |
| ----------- | ------------------------------------ | ------ | -------- |
| name        | Applicant's name(8, 64)              | String | true     |
| description | Applicant's description              | String | true     |
| birth date  | Applicant's birth date               | Date   | true     |
| phone       | Applicant's phone(regax)             | String | true     |
| source      | Where did you find us                | String | true     |
| gender      | Applicant's gender("male", "female") | Enum   | true     |

##### Response status codes

`201 - Applicant created successfully`

`400 - Name || Description || Birth date || Phone || Source || Gender || Password is invalid`

`404 - Course not found`

`500 - Internal Server Error`

#### 2. Applicant Update Put Endpoint

##### Request

`SERVER_URL/applicants:applicant_id`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin, Operator`

Request body:

| Name        | Description                                          | Type   | Required |
| ----------- | ---------------------------------------------------- | ------ | -------- |
| name        | Applicant's name(8, 64)                              | String | false    |
| description | Applicant's description                              | String | false    |
| birth date  | Applicant's birth date                               | Date   | false    |
| phone       | Applicant's phone(regax)                             | String | false    |
| source      | Where did you find us                                | String | false    |
| gender      | Applicant's gender("male", "female")                 | Enum   | false    |
| status      | Applicant's status("waiting", "active", "cancelled") | Enum   | false    |

##### Response status codes

`200 - Applicant updated successfully`

`400 - Name || Description || Birth date || Phone || Source || Gender || Password || Status is invalid`

`404 - Applicant not found`

`500 - Internal Server Error`

#### 3. Applicant Get Endpoit

##### Request

`SERVER_URL/applicants/`

Headers:

`Content-Type: "application/json"`

`Authorization: "TOKEN"`

Permissions: `Admin Operator`

Query body:

| Name   | Description | Type   | Required |
| ------ | ----------- | ------ | -------- |
| order  | DESC ,ASC   | String | false    |
| limit  | 15          | Number | false    |
| offset | 0           | Number | false    |

##### Response status codes:

`200 - Applicants list`

`500 - Internal Server Error`
