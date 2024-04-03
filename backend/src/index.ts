import express from "express";
// import {graphqlHTTP} from "express-graphql";
import {createHandler} from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import {schema} from "./graphql/schema";
import {resolver} from "./graphql/resolvers";
import {authVerify} from "./middleware/authVerify";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() =>
    app.listen(3000, () => {
      console.log("server is running");
    })
  )
  .catch((err) => console.log(err));

app.use(authVerify);
app.get("/playground", expressPlayground({endpoint: "/graphql"}));

app.use("/graphql", (req, res, next) =>
  createHandler({
    schema: schema,
    rootValue: resolver,
    context: {req, res},
  })(req, res, next)
);
