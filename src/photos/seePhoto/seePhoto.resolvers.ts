import { Resolvers } from "../../types";


const resolvers: Resolvers = {
    Query: {
        seePhoto: async (
            _: unknown,
            id: number,
            { client }
        ) => await client.photo.findUnique({
            where: {
                id
            }
        })
    }
}

export default resolvers