import client from "../client";
import { Resolvers } from "../types";


const resolvers: Resolvers = {
    Photo: {
        user: ({ userId }) => {
            console.log('userId', userId)
            return client.user.findUnique({
                where: {
                    id: userId
                }
            })
        },
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
            )
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
            })
    }
}

export default resolvers