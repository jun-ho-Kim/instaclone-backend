require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import * as express from 'express';
import { getUser, protectResolver } from '../src/users/users.utils';
import * as logger from 'morgan';
import {typeDefs, resolvers} from './schema'
import client from "./client";

const app = express();

const PORT = process.env.PORT;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req }) => {
        return  {
            loggedInUser: await getUser(req.headers.token),
            client,
            protectResolver,
        };
    },
});
app.use('/static', express.static("uploads"))
app.use(logger('tiny'));
server.applyMiddleware({app});
app.listen({port: PORT}, 
    ()=> console.log(`🚀 Server is running on http://localhost:${PORT}/`));
