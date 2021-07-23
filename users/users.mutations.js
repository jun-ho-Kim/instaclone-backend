import bcrypt from "bcrypt";
import client from '../client';

export default {
    Mutation: {
        createAccount: async(_, {
            firstName,
            lastName,
            userName,
            email,
            password,
        }) => {
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
        }
    }
}