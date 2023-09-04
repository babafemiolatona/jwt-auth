## Jwt-Auth

This is a Simple Node.js authentication system that allows users to register, log in, and protect routes using JSON Web Tokens (JWT).

## Features
- User registration with email and password.
+ User login with email and password.
* JWT-based authentication.
- Route protection for authenticated users.

## Installation
Clone this repository and install the dependencies

```git clone https://github.com/babafemiolatona/jwt-auth.git```

```cd jwt-auth```

```npm install mongoose express jsonwebtoken dotenv bcryptjs```

## Configuration
Create a .env file and set the following environment variables:

```API_PORT=4001```

```MONGO_URI="<your-mongodb-uri>"```

```TOKEN_KEY="<your-token>"```

## Database
Set up your MongoDB database and replace MONGODB_URI with your database connection string.

## Start server
Run the application.

```npm run dev```

## Usage
Access the API at http://localhost:4001 using Postman. Use the provided API endpoints for registration, login, and protected routes.

## API Endpoints
- ```POST /register```: Register a new user with an email and password.
+ ```POST /login```: Log in with an email and password to obtain a JWT token.
* ```GET /protected```: Access a protected route by providing a valid JWT token in the request headers.

## Contributions
Contributions are welcome. Please open issues and pull requests for improvements or bug fixes.
