import { gql } from "apollo-server-express";

export default gql`
type Mutation {
        toggleLikes(id: Int!): MutationResult!
    }
`