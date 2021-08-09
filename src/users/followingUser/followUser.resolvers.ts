import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
    Mutation: {
        followUser: protectResolver(async (_, { userName }, { loggedInUser }, {client}) => {
            const ok = await client.user.findUnique({where: {userName}});
            if(!ok) {
                return {
                    ok: false,
                    error: "유저를 찾을 수 없습니다."
                }
            };
            await client.user.update({
                where: {id: loggedInUser.id},
                data: {
                    following: {
                        connect: {
                            userName
                        },
                    },
                },
            });
            return {
                ok: true,
            }
        })
    }
}

export default resolvers;