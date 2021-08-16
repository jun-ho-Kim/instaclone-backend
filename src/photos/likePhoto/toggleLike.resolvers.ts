import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";


const resolvers: Resolvers = {
    Mutation: {
        toggleLikes: protectResolver(
            async (_: unknown, { id }, { client, loggedInUser }) => {
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

                const likeWhere = {
                    photoId_userId: {
                        userId: loggedInUser.id,
                        photoId: id
                    }
                }

                const like = await client.like.findUnique({
                    where: likeWhere
                })

                if (like) {
                    await client.like.delete({
                        where: likeWhere
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
        )
    }
}

export default resolvers