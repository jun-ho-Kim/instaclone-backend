import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        deletePhoto: protectResolver(
            async (_: unknown, { id }, { client, loggedInUser }) => {
                const photo = await client.photo.findUnique({
                    where: {
                        id
                    },
                    select: {
                        userId: true
                    }
                })

                if (!photo) {
                    return {
                        ok: false,
                        error: '사진이 존재하지 않습니다.'
                    }
                } else if (photo.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: '사진을 삭제할 권한이 없습니다.'
                    }
                } else {
                    await client.comment.deleteMany({
                        where: {
                            photoId: id,

                        }
                    })
                    await client.like.deleteMany({
                        where: {
                            photoId: id,
                        }
                    })
                }
                await client.photo.delete({
                    where: {
                        id
                    }
                })

                return {
                    ok: true
                }
            }
        )
    }
}

export default resolvers