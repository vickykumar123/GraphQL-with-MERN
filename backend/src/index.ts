import express from "express";
import {graphqlHTTP} from "express-graphql";
import mongoose from "mongoose";
import "dotenv/config";

import {schema} from "./graphql/schema";
import {resolver} from "./graphql/resolvers";
import {authVerify} from "./middleware/authVerify";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() =>
    app.listen(3000, () => {
      console.log("server is running");
    })
  )
  .catch((err) => console.log(err));

app.use(authVerify);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);
