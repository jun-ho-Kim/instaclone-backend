import { gql } from "apollo-server-express";

export default gql`

    type SeePhotoResult {
        file: String
        caption: String
    }

    type Query {
        seePhoto(id: Int!): Photo
    }
`
