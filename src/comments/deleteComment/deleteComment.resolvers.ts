import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        deleteComment: protectResolver(
            async (_: unknown, { id }, { client, loggedInUser }) => {
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
                        error: '댓글을 찾을 수 없습니다.'
                    }
                } else if (comment.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: '댓글 작성자만 삭제할 수 있습니다.'
                    }
                } else (
                    await client.comment.delete({
                        where: {
                            id
                        }
                    })
                )

                return {
                    ok: true,
                }
            }
        )
    }
}

export default resolvers