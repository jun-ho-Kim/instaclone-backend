import { Resolvers } from "../../types";


const resolvers: Resolvers = {
    Mutation: {
        createComment: async (_: unknown, { photoId, payload }, { client, loggedInUser }) => {
            const photo = client.photo.findUnique({
                where: {
                    id: photoId
                },
                select: {
                    id: true
                }
            })

            if (!photo) {
                return {
                    ok: false,
                    error: '사진을 찾을 수 없습니다.'
                }
            }


            await client.comment.create({
                data: {
                    photo: {
                        connect: {
                            id: photoId
                        }
                    },
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    },
                    payload
                },
            })

            return {
                ok: true
            }
        }
    }
}

export default resolvers