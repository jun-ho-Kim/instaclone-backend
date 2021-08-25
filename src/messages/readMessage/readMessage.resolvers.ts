import { Resolvers } from "../../types";

export const resolvers: Resolvers = {
    Mutation: {
        readMessage: async (
            _: unknown,
            { id }: any,
            { client, loggedInUser }
        ) => {
            const message = await client.message.findFirst({
                where: {
                    id,
                    user: {
                        id: {
                            not: loggedInUser.id,
                        }
                    },
                    room: {
                        users: {
                            some: {
                                id: loggedInUser.id
                            }
                        }
                    }
                }
            })

            if (!message) {
                return {
                    ok: false,
                    error: '존재하지 않는 메세지입니다.'
                }
            }

            await client.message.update({
                where: {
                    id,
                },
                data: {
                    read: true
                }
            })

            return {
                ok: true,
            }

        }
    }
}