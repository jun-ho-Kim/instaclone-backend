import bcrypt from "bcrypt";
import {createWriteStream} from 'fs'
import { protectResolver } from "../users.utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
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
                {
                    loggedInUser
                }, 
                {
                    client
                },
            ) => {
                let fileUrl = null;
                let uglyPassword = null;
                if(newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                console.log("loggedInUser", Boolean(loggedInUser));
                if(avartar) {
                    const {filename, createReadStream } = await avartar;
                    const newFileName = loggedInUser.userName + Date.now() + filename
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(process.cwd() + '/uploads/' + newFileName);
                    fileUrl=`http://localhost:4000/static/${newFileName}`
                    readStream.pipe(writeStream);
                }
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
                        ...(avartar&& {avartar: fileUrl}),
                }});
                return {
                    ok: true,
                }   
            }
        ),
    },
};

export default resolvers;