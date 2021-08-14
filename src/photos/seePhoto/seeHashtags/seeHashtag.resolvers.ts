import { Resolvers } from "../../../types"


const resolvers: Resolvers = {
    Query: {
        seeHashtag: async (_: unknown, { hashtag }, { client }) =>
            client.hashtag.findUnique({
                where: {
                    hashtag
                }
            })
    }
}

export default resolvers