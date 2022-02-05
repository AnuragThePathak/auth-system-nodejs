# Auth-system-node

- It is a nodejs based backend mainly focused on authentication and authorization, made with TypeScript.
- It has two routes till now:
  - /login - for login
  - /signup - for creating new account
- It has a database with a collections called User, which has the following fields:
  - email - unique
  - username - unique
  - hash - hashed password
- For database MongoDB is used with mongoose.
- For authorization JWT is used.
