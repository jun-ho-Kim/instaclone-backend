import { gql } from "apollo-server-express";

export default gql`
    type Query {
        seePhotoLikeUser(id: Int!): [User]
    }

`