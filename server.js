import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '.prisma/client';

const client = new PrismaClient()

const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        description: String
        year: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie]
        movie(id:Int!): Movie
    }
    type Mutation {
        createMovie(title: String!, description: String, year: Int!): Movie
        updateMovie(id:Int, title: String, description: String, year:Int): Movie
        deleteMovie(id: Int!): Movie
    }
`;

const resolvers = {
    Query: {
        movies:() => client.movie.findMany(),
        movie:(_, {id}) => client.movie.findUnique({where: {id}})
    },
    Mutation: {
        createMovie: (_, {title, description, year}) => 
            client.movie.create({
                data: {
                    title, description, year
                }
            }),
        updateMovie: (_, {id, title, description, year}) => client.movie.update({data: {title, description, year}, where: {id}}),
        deleteMovie: (_, {id}) => 
            client.movie.delete({where: {id}})
           
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(()=> console.log("Server is running on http://localhost:4000/"));
