import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import dotaBuffScraper from "./dotaBuffScraper";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Hero {
    name: String
  }

  type Query {
    books: [Book]
    heroes: [Hero]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    heroes: async (parent, args, context, info) => {
      const names = await context.dataSources.dotaBuffScraper.getStats();
      return names;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      dotaBuffScraper: new dotaBuffScraper()
    };
  },
  introspection: true,
  playground: { endpoint: "/api" }
});

const app = express();

server.applyMiddleware({ app, path: "/api" });

const port = process.env.PORT || 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at ${server.graphqlPath}`)
);

export default app;
