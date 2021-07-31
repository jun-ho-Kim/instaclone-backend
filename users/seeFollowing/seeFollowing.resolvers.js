import client from "../../client";


export default {
    Query: {
        seeFollowing: async(_, {userName, lastId}) => {
            const ok = await client.user.findUnique({
                where: {userName},
                select: {id: true}
            })
            if(!ok) {
                return {
                    ok: false,
                    error: "유저를 찾을 수 없습니다."
                }
            };
            const following = await client.user.findUnique({
                where: { userName }
            }).following({
                take: 3,
                skip: 0,
                ...lastId && {cursor: {id: lastId}},
            });
            return {
                ok: true,
                following,
            }
        },
    }
}