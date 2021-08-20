import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHastags } from "../photos.utils";

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
                        hashtagObj = processHastags(caption)
                    }

                    const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads")
                    const upload = await client.photo.create({
                        data: {
                            user: {
                                connect: {
                                    id: loggedInUser.id
                                }
                            },
                            file: fileUrl,
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