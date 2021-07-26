import bcrypt from "bcrypt";
import client from '../client';
import jwt from 'jsonwebtoken';

export default {
    Mutation: {
        createAccount: async(_, {
            firstName,
            lastName,
            userName,
            email,
            password,
        }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                userName,
                            },
                            {
                                email,
                            }
                        ]
                    }
                });
                if(existingUser) {
                    throw new Error("This username/password is already taken");
                    
                }
                console.log("existingUser",existingUser)
                const uglypassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        password: uglypassword,
                    }
                })


                const token = await jwt.sign({id: user.id}, process.env.SERCRET_KEY)
            } catch(e) {
                return e;
            };
        },
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

            const token = await jwt.sign(user.id, process.env.SERCRET_KEY)
            console.log("token", token)
            return {
                ok: true,
                token
            }
        }
    }
}