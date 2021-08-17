import { gql } from "apollo-server-express";

export default gql`
    type MutationResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        deletePhoto(id: Int!): MutationResult!
    }
`