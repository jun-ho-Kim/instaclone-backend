import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        userName: String!
        email: String!
        bio: String
        avartar: String
        photos: [Photo]
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