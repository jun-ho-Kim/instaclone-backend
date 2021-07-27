import client from "../../client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export default {
    Mutation: {
        login: async(_, {email, password}) => {
            const user = await client.user.findFirst({where: {email}})
            if(!user) {
                return {
                    ok: false,
                    error: "이메일이 존재하지 않습니다."
                }
            };
            console.log("user.password", user.password)
            const passwordOK = await bcrypt.compare(password, user.password);
            if(!passwordOK) {
                return {
                    ok: false,
                    error: "비밀번호가 다릅니다."
                }
            };

            const token = await jwt.sign(user.id, process.env.SERCRET_KEY);
            console.log("token", token)
            return {
                ok: true,
                token
            }
        }
    }
}