import { gql } from "apollo-server";

export default gql`

    type LoginResult {
        ok: Boolean!
        token: String
        error: String
    }

    type User {
        id: String!
        firstName: String!
        lastName: String
        userName: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        seeProfile(userName: String!): User
    }
    
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            userName: String!
            email:String! 
            password: String!
        ): User

        login(
            email: String!
            password: String!
        ): LoginResult
    }
`;