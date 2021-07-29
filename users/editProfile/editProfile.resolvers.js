import client from "../../client";
import bcrypt from "bcrypt";
import {createWriteStream} from 'fs'
import { protectResolver } from "../users.utils";

export default {
    Mutation: {
        editProfile: protectResolver(
            async(_,
                {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: newPassword,
                    bio,
                    avartar
                },
                {loggedInUser, protectResolver}
            ) => {
                protectResolver(loggedInUser);
                let uglyPassword = null;
                if(newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                console.log("loggedInUser", Boolean(loggedInUser));
                const {filename, createReadStream } = await avartar;
                const readStream = createReadStream();
                const writeStream = createWriteStream(process.cwd() + '/uploads/' + filename);
                readStream.pipe(writeStream)
                await client.user.update({
                    where: {
                        id: loggedInUser.id
                    }, 
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        ...(uglyPassword&&{password:uglyPassword}),
                        bio,
                }});
                return {
                    ok: true,
                }   
            }
        ),
    },
};