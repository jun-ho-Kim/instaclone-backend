require("dotenv").config();
import { ApolloServer } from 'apollo-server';
import { getUser, protectResolver } from './users/users.utils';
import {typeDefs, resolvers} from './schema'

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


server.listen().then(()=> console.log(`Server is running on http://localhost:${PORT}/`));
