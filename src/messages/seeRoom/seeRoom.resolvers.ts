import { Resolvers } from "../../types";

export const resolvers: Resolvers = {
    Query: {
        seeRoom: async (_: unknown, { id }, { client, loggedInUser }) =>
            client.room.findFirst({
                where: {
                    id,
                    users: {
                        some: {
                            id: loggedInUser.id
                        }
                    }
                }
            })
    }
}