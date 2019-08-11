import * as dotenv from 'dotenv' 
dotenv.config()

import {typeDefs, resolvers} from './grapgql-schema'
import {ApolloServer} from 'apollo-server-express'
import {v1 as neo4j} from 'neo4j-driver'
var makeAugmentedSchema = require('neo4j-graphql-js').makeAugmentedSchema
import * as express from 'express'



const app =express()

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers
});


const driver = neo4j.driver(
  process.env.NEOJ_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "pa55word"
  )
)

const server = new ApolloServer({
  context: { driver },
  schema: schema,
  introspection: true,
  playground: true
})

// Specify port and path for GraphQL endpoint
const port = process.env.GRAPHQL_LISTEN_PORT || 4001;
const path = "/graphql";

/*
* Optionally, apply Express middleware for authentication, etc
* This also also allows us to specify a path for the GraphQL endpoint
*/
server.applyMiddleware({app, path});

app.listen({port, path}, () => {
  console.log(`GraphQL server ready at http://localhost:${port}${path}`);
});
