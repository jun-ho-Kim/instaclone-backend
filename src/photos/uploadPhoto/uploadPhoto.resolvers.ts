import client from "../../client";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

interface UploadPhotoTypes {
    file: string
    caption: string
}

const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectResolver(
            async (_: unknown, { file, caption }, { loggedInUser }) => {
                try {
                    let hashtagObj = []
                    if (caption) {
                        const hashtags = caption.match(/#[\w]+/g)
                        hashtagObj = hashtags.map((hashtag: any) => ({
                            where: { hashtag },
                            create: { hashtag }
                        }))
                    }

                    const upload = await client.photo.create({
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

                    return upload

                } catch (error) {
                    console.log(error)
                }
            })
    }
}

export default resolvers