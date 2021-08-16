import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeFeed: async (_: unknown, args: unknown, { client, loggedInUser }) =>
            await client.photo.findMany({
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id
                                    }
                                },
                            },
                        },
                        {
                            userId: loggedInUser.id
                        }
                    ]
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
    }
}

export default resolvers