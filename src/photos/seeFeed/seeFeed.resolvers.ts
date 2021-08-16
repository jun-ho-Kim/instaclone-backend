import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        seeFeed: protectResolver(
            async (_: unknown, args: unknown, { client, loggedInUser }) =>
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
        )
    }
}

export default resolvers