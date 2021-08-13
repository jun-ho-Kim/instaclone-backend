import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Resolvers } from "../../types"

const resovlers: Resolvers = {
    Mutation: {
        login: async (_, { email, password }, { client }) => {
            const user = await client.user.findFirst({ where: { email } })
            if (!user) {
                return {
                    ok: false,
                    error: "이메일이 존재하지 않습니다."
                }
            };
            console.log("user.password", user.password)
            const passwordOK = await bcrypt.compare(password, user.password);
            console.log("password OK", passwordOK)
            if (!passwordOK) {
                return {
                    ok: false,
                    error: "비밀번호가 다릅니다."
                }
            };

            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            console.log("token", token)
            return {
                ok: true,
                token
            }
        }
    }
}

export default resovlers;