import client from "../client";
import { Resolvers } from "../types";

export const resolvers: Resolvers = {
    Room: {
        user: async (id: number, _, { client }) =>
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
            })
    }
}