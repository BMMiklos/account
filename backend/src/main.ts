import { GraphQLSchema } from "graphql";
import { mutationType, projectResolvers, queryType } from "./graphql/graphql.main";
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

mongoose.connect('mongodb://mongo:27017/account', {
  connectTimeoutMS: 500,
  user: "root",
  pass: "example",
  authSource: "admin"
})
.catch((response: any) => {
  console.log("MongoDB connection error!");
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
    rootValue: projectResolvers,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
