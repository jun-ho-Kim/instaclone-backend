import { gql } from "apollo-server-express";

export default gql`

    type uploadPhotoResults {
        file: String,
        caption: String
    }

    type Mutation {
        uploadPhoto(file: String!, caption: String): Photo
    }

`