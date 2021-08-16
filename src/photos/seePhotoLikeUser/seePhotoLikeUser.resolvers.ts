import { Resolvers } from "../../types";


const resolvers: Resolvers = {
    Query: {
        seePhotoLikeUser: async (_: unknown, { id }, { client }) => {
            const user = await client.user.findMany({
                where: {
                    likes: {
                        some: {
                            photoId: id
                        }
                    }
                },
            })
            // 아래와 같은 코드로도 가능
            // const user = await client.like.findMany({
            //     where: {
            //         photoId: id
            //     },
            //     select: {
            //         user: true
            //     }
            // })

            return user.map(user => user)
        }
    }
}


export default resolvers