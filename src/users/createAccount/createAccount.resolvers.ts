import * as bcrypt from 'bcrypt'
import { Resolvers } from "../../types"

const resolvers: Resolvers = {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            userName,
            email,
            password,
        }, {
            client
        }
        ) => {
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
                if (existingUser) {
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
            } catch (e) {
                return e;
            };
        },
    }
}

export default resolvers;