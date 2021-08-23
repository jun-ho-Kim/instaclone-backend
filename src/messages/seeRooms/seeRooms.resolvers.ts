import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

export const resolvers: Resolvers = {
    Query: {
        seeRooms: async (_: unknown, __: unknown, { client, loggedInUser }) =>
            client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: loggedInUser.id
                        }
                    }
                }
            })
    }
}