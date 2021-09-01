import { Resolvers } from "../../types";

export const resolvers: Resolvers = {
    Mutation: {
        sendMessage: async (_: unknown, { payload, roomId, userId }, { client, loggedInUser }) => {
            let room = null
            if (userId) {
                const user = await client.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        id: true
                    }
                })
                if (!user) {
                    return {
                        ok: false,
                        error: '존재하지 않는 유저입니다.'
                    }
                }
                room = await client.room.create({
                    data: {
                        users: {
                            connect: [
                                {
                                    id: userId,
                                },
                                {
                                    id: loggedInUser.id
                                }
                            ]
                        }
                    }
                })
            } else if (roomId) {
                room = await client.room.findUnique({
                    where: {
                        id: roomId
                    }
                })
                if (!room) {
                    return {
                        ok: false,
                        error: '존재하지 않는 대화방입니다.'
                    }
                }
            }
            await client.message.create({
                data: {
                    payload,
                    room: {
                        connect: {
                            id: room.id
                        }
                    },
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    }
                }
            })
            return {
                ok: true
            }
        }
    }
}