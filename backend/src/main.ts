// import rootResolver from "./graphql/root-resolver";
// import rootSchema from "./graphql/root-schema";

import { GraphQLSchema } from "graphql";
import { mutationType, queryType } from "./graphql/graphql.main";

const express = require("express");
const app = express();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

// Cors

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*'
}));

// MongoDB

const mongoose = require("mongoose");

mongoose.connect('mongodb://172.17.0.1:27017/account', {
  connectTimeoutMS: 500,
  user: "root",
  pass: "example",
  authSource: "admin"
})
.then((response: any) => {
  console.log("connected");
})
.catch((response: any) => {
  console.log("error");
});

// GraphQL

const graphqlSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
