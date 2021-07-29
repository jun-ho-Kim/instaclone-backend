require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from 'express';
import { getUser, protectResolver } from './users/users.utils';
import logger from 'morgan';
import {typeDefs, resolvers} from './schema'

const app = express();

const PORT = process.env.PORT;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req }) => {
        return  {
            loggedInUser: await getUser(req.headers.token),
            protectResolver,
        };
    },
});

app.use(logger('tiny'));
server.applyMiddleware({app});
app.listen({port: PORT}, 
    ()=> console.log(`🚀 Server is running on http://localhost:${PORT}/`));
