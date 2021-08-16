import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seePhotoComments: async (_: unknown, { photoId }, { client }) =>
            await client.comment.findMany({
                where: {
                    photoId
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })

    }
}

export default resolvers