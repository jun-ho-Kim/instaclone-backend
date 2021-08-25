import client from "../client";
import { Resolvers } from "../types";

export const resolvers: Resolvers = {
    Room: {
        user: async (id: number) =>
            client.room.findUnique({
                where: {
                    id,
                }
            }).users(),

        messages: async (id: number) =>
            client.message.findMany({
                where: {
                    roomId: id
                }
            }),

        unreadTotal: async (id: number, __, { loggedInUser }) => {
            if (!loggedInUser) {
                return 0
            }

            return client.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id
                        }
                    }
                }
            })
        }
    }
}