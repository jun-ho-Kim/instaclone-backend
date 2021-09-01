import client from "../client";
import { Resolvers } from "../types";

export const resolvers: Resolvers = {
    Room: {
        user: async ({ id }) =>
            client.room.findUnique({
                where: {
                    id,
                }
            }).users(),

        messages: async ({ id }) =>
            client.message.findMany({
                where: {
                    roomId: id
                }
            }),

        unreadTotal: async ({ id }, __, { loggedInUser }) => {
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
    },
    Message: {
        user: async ({ id }) => client.message.findFirst({
            where: {
                id
            }
        }).user()
    }
}