# meetup-api
 
## Stack
+ Node.js
+ Express
+ PostgreSQL

## How to install and run the project
You need to have [Node.js](https://nodejs.org/en/download/) installed.

Create ```.env``` file with following variables:
```
# DB
DB_DIALECT = postgres
DB_HOST = localhost
DB_NAME = <your_database_name>
DB_USERNAME = <your_database_username>
DB_PASSWORD = <your_database_password>

# auth
JWT_SECRET = SECRET_KEY
HASH_SECRET = SECRET_HASH

# cookie
COOKIE_SECRET = SECRET_COOKIE
```

```
npm install
npm start
```

Documentation endpoint: ```/api-docs```
