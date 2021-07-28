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
            {loggedInUser, protectResolver}
        ) => {
            protectResolver(loggedInUser);
            let uglyPassword = null;
            if(newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            console.log("uglyPassword", uglyPassword);
            console.log("loggedInUser", loggedInUser);
            await client.user.update({
                where: {
                    id: loggedInUser.id
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