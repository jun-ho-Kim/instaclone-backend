import client from "../../client";
import bcrypt from 'bcrypt';

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
                };
                const uglypassword = await bcrypt.hash(password, 10);
                await client.user.create({
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        password: uglypassword,
                    }
                });
                return {
                    ok: true
                };
            } catch(e) {
                return e;
            };
        },
    }
}