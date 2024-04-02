# MERN Stack GraphQL Setup

This repository contains a basic setup for integrating GraphQL with a MERN stack application. It utilizes MongoDB, Express.js, React.js, Node.js, and GraphQL for building a full-stack application.

## Prerequisites

Make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB
- Git

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/vickykumar123/GraphQL-with-MERN.git
```

### Install dependencies
```
cd backend
npm install

cd ../frontend
npm install
```
### Start the both the server
```
cd backend
npm run dev

cd ../frontend
npm run dev
```
##### Use env.example for setting up the .env file
## GraphQL Setup

GraphQL schemas, resolvers, and types are defined in the `backend/src/graphql` directory.

[express-GraphQL](https://github.com/graphql/express-graphql) is used to integrate GraphQL with the Express.js server in `server/index.js`.

On the frontend, GraphQL queries and mutations can be made using fetch api. All queries are defined in `frontend/src/graphql`

# Contributing
Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes.


