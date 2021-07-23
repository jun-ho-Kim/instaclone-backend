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
            } catch(e) {
                return e;
            };
        }
    }
}