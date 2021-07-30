import client from "../../client"

export default {
    Query: {
        seeFollowers: async(_, {userName, page}) => {
            try {
                const ok = await client.user.findUnique({where: {userName}, select: {id: true}});
                if(!ok) {
                    return {
                        ok: false,
                        error: "유저정보를 찾을 수 없습니다."
                    }
                };
                const followers = await client.user
                    .findUnique({where: {userName}})
                    .followers({
                        take: 5,
                        skip: (page-1) * 5,
                    });
                console.log("followers", followers);
                const totalFollowers = await client.user.count({
                    where: {following: {some: {userName}}}
                });
                return {
                    ok: true,
                    followers,
                    totalPages: Math.ceil(totalFollowers/5)
                }
            } catch(error) {
                return {
                    ok: false,
                    error
                }
            }
        }
    }
}