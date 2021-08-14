import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        searchPhotos: async (_: unknown, { keyword }, { client }) =>
            await client.photo.findMany({
                where: {
                    caption: {
                        startsWith: keyword
                    }
                }
            })
    }
}

export default resolvers