import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHastags } from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        editPhoto: protectResolver(
            async (_: unknown, { id, caption }, { client, loggedInUser }) => {
                const oldPhoto = await client.photo.findFirst({
                    where: {
                        id,
                        userId: loggedInUser.id
                    },
                    include: {
                        hashtags: {
                            select: {
                                hashtag: true
                            }
                        }
                    }
                })

                if (!oldPhoto) {
                    return {
                        ok: false,
                        error: '사진을 찾을 수 없습니다.'
                    }
                }

                await client.photo.update({
                    where: {
                        id
                    },
                    data: {
                        caption,
                        hashtags: {
                            disconnect: oldPhoto.hashtags,
                            connectOrCreate: processHastags(caption)

                        }
                    },
                })

                return {
                    ok: true,
                }
            }
        )
    }
}

export default resolvers