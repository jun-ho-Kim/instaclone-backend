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

                    console.log("loggend USer1", loggedInUser)
                    let hashtagObj = []
                    if (caption) {
                        const hashtags = caption.match(/#[\w]+/g)
                        hashtagObj = hashtags.map((hashtag: any) => ({
                            where: { hashtag },
                            create: { hashtag }
                        }))
                    }

                    console.log("loggend USer", loggedInUser)



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
                    console.log('upload', upload)

                    return upload

                } catch (error) {
                    console.log(error)
                }
            })
    }
}

export default resolvers