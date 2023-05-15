# Simple Web application
The project is a simple CRUD system that manage users and is implemented with the following technologies:
- Backend: Java Spring
- Fronted: Angular
- DBMS: MySQL

## Endpoints
`GET` `/api/user/all` -> Get all users based on the **pageNumber**, **pageSize** and/or the **sort property** that is sorted by ascending.
  - `pageNumber` param (required)
  - `pageSize` param (required)
  - `sortProperty` param (not required)
  - `sortDirection` param (not required)

`GET` `/api/user/search` -> Search a user by name or surname.
  - `searchTerm` param (required)

`GET` `/api/user/` -> Get a user by id.
  - `:id` path variable

`POST` `/api/user` -> Create a user.
  - `user` request body

`PUT` `/api/user` -> Update a user.
  - `:id` path variable
  - `user` request body

`DELETE` `/api/user` -> Delete a user.
  - `:id` path variable
