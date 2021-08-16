import client from "../client";
import { Resolvers } from "../types";


const resolvers: Resolvers = {
    Photo: {
        user: ({ userId }) => {
            return client.user.findUnique({
                where: {
                    id: userId
                }
            })
        },
        isMine: ({ userid }, _, { loggedInUser }) =>
            userid === loggedInUser?.id,
        // if (userid !== loggedInUser) {
        //     return false
        // } else {
        //     return true
        // }
        hashtags: ({ id }) =>
            client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id
                        }
                    }
                }
            }
            ),
        likes: async ({ id }) => await client.like.count({
            where: {
                photoId: id
            }
        })
    },
    Hashtag: {
        photos: ({ id }, { page }) => {
            console.log("id, page", id, page)
            return client.hashtag.findUnique({
                where: {
                    id
                }
            }).photos()
        },
        totalPhotos: ({ id }) =>
            client.photo.count({
                where: {
                    hashtags: {
                        some: {
                            id
                        }
                    }
                }
            }),
    }
}

export default resolvers