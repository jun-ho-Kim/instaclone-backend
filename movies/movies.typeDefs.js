import { gql } from "apollo-server";

export default gql`
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