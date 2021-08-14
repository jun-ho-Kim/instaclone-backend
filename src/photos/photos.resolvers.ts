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
            })
    }
}

export default resolvers