import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seePhoto: async (
            _: unknown,
            { id }: any,
        ) => client.photo.findUnique({
            where: {
                id
            }
        })
    }
}

export default resolvers