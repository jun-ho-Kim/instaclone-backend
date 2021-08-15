import { Resolvers } from "../../types";


const resolvers: Resolvers = {
    Mutation: {
        toggleLikes: async (_: unknown, { id }, { client, loggedInUser }) => {
            const photo = await client.photo.findUnique({
                where: {
                    id
                }
            })

            if (!photo) {
                return {
                    ok: false,
                    error: '사진을 찾을 수 없습니다.'
                }
            }

            const like = await client.like.findUnique({
                where: {
                    photoId_userId: {
                        userId: loggedInUser.id,
                        photoId: id
                    }
                }
            })

            if (like) {
                await client.like.delete({
                    where: {
                        photoId_userId: {
                            userId: loggedInUser.id,
                            photoId: id
                        }
                    }
                })

                return {
                    ok: true
                }
            } else {
                await client.like.create({
                    data: {
                        user: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        photo: {
                            connect: {
                                id
                            }
                        }
                    },
                })

                return {
                    ok: true
                }
            }
        },
    }
}

export default resolvers