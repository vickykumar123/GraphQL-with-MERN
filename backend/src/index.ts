import express from "express";
import {graphqlHTTP} from "express-graphql";
import {buildSchema} from "graphql";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery{
            events:String!
        }

        type RootMutation{
            createEvent(name:String):String
        }
        schema{
            query:RootQuery,
            mutation:RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return "hello";
      },
      createEvent: (args: {name: string}) => {
        const event = args.name;
        return event;
      },
    },
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("server is running");
});
