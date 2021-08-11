import client from "../../client";
import { protectResolver } from "../../users/users.utils";

interface UploadPhotoTypes {
    file: string
    caption: string
}

export default {
    Mutation: {
        uploadPhoto: protectResolver(
            async (_: unknown, { file, caption }, { loggedInUser }) => {
                let hashtagObj = []
                if (caption) {
                    const hashtags = caption.match(/#[\w]+/g)
                    hashtagObj = hashtags.map(hashtag => ({
                        where: { hashtag },
                        create: { hashtag }
                    }))
                }

                return await client.photo.create({
                    data: {
                        user: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        file,
                        caption,
                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj,
                            }
                        }),
                    },
                })
            })
    }
}