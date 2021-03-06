import { protectResolver } from "../users.utils";


export default {
    Mutation: {
        unfollowUser: protectResolver(async(_, {userName}, {loggedInUser}, {client}) => {
            try {
                const ok = await client.user.findUnique({where: {userName}})
                if(!ok) {
                    return {
                        ok: false,
                        error: "유저를 찾을 수 없습니다."
                    }
                }
                await client.user.update({
                    where: {id: loggedInUser.id},
                    data: {
                        following: {
                            disconnect: {
                                userName
                            }
                        }
                    }
                })
                return {
                    ok: true,
                }
            } catch(error) {
                return {
                    ok: false,
                    error
                }
            }
        })
    }
}