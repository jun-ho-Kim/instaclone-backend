import { gql } from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        userName: String!
        email: String!
        bio: String
        avartar: String
        followers: [User]
        following: [User]
        totalFollowers: Int!
        totalFollowing: Int!
        isMe: Boolean!
        isFollowing: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;