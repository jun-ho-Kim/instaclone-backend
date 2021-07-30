import { gql } from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        userName: String!
        email: String!
        followers: [User]
        following: [User]
        bio: String
        avartar: String
        createdAt: String!
        updatedAt: String!
    }
`;