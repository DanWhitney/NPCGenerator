 var neo4jgraphql = require("neo4j-graphql-js");
 var fs = require( "fs");
 var path = require("path");

/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */
//console.log ("console" , path.dirname())
export const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join( "./build/schema.graphql")
  )
  .toString("utf-8");

export const resolvers= {
  Query: {
    usersBySubstring: neo4jgraphql
  }
}
