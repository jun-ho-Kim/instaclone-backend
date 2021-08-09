import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeFollowers: async(_, {userName, page}, {client}) => {
            try {
                const ok = await client.user.findUnique({
                    where: {userName}, 
                    select: {id: true}
                });
                if(!ok) {
                    return {
                        ok: false,
                        error: "유저정보를 찾을 수 없습니다."
                    }
                };
                //크리스티안 호날두의 프로필에 가서 follower를 클릭하는 방법
                const followers = await client.user
                    .findUnique({where: {userName}})
                    .followers({
                        take: 5,
                        skip: (page-1) * 5,
                    });
                //following 리스트에 크리스트앙 호날두가 있는 사람들 찾는 방법
                // const bfollowers = await client.user
                //     .findMany({
                //         where: {
                //             following: {
                //                 some: {
                //                     userName
                //                 },
                //             } 
                //         } 
                //     });

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

export default resolvers;