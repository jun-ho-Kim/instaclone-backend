import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

export const resolvers: Resolvers = {
    Mutation: {
        editComment: protectResolver(
            async (_: unknown, { id, payload }, { client, loggedInUser }) => {
                const comment = await client.comment.findUnique({
                    where: {
                        id,
                    },
                    select: {
                        userId: true
                    }
                })

                if (!comment) {
                    return {
                        ok: false,
                        error: '댓글이 존재하지 않습니다.'
                    }
                } else if (comment.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "댓글을 삭제할 권한이 없습니다."
                    }
                } else {
                    return client.comment.update({
                        where: {
                            id,
                        },
                        data: {
                            payload,
                        }
                    })
                }
            }
        )
    }
}