import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        editProfile: async(_,
            {
                firstName,
                lastName,
                userName,
                email,
                password: newPassword
            },
        ) => {
            let uglyPassword = null;
            if(newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            console.log("uglyPassword", uglyPassword);
            await client.user.update({
                where: {
                    id: 3
                }, 
                data: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    ...(uglyPassword&&{password:uglyPassword})
            }});
        }
    },
};