import { GraphQLBoolean, GraphQLScalarType, GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLEnumType, GraphQLUnionType } from "graphql";

const Graph = new GraphQLObjectType({
  name: "Graph",
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
  }
});

// Az összeköttetéseket tárolja
const Edge = new GraphQLObjectType({
  name: "Edge",
  fields: () => ({
    _id: { type: GraphQLID },
    node: { type: NodeSchema }
  })
});

const NodeInputSchema = new GraphQLInputObjectType({
  name: "NodeInput",
  fields: {
    edges: { type: GraphQLList(Edge) },
    description: { type: GraphQLString },
    context: { type: GraphQLString },
    executor: { type: GraphQLString }
  }
});

// Az eseményeket tárolja el
const NodeSchema = new GraphQLObjectType({
  name: "Node",
  fields: () => ({
    _id: { type: GraphQLID },
    edges: { type: GraphQLList(Edge) },
    description: { type: GraphQLString },
    type: { type: NodeTypeEnum },
    context: { type: GraphQLString }
    // executor: { type: NodeExecutor } // ami majd megfuttatja a node-ot
  })
});

// Csomópont lehetséges típusai
const NodeTypeEnum = new GraphQLEnumType({
  name: "NodeType",
  values: {
    INPUT: { value: "input" },
    HIDDEN: { value: "hidden" },
    OUTPUT: { value: "output" }
  }
});
