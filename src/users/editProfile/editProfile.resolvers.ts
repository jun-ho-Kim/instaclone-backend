import * as bcrypt from "bcrypt"
import { createWriteStream } from 'fs'
import { protectResolver } from "../users.utils"
import { Resolvers } from "../../types"
import { uploadToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectResolver(
            async (_,
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
                    loggedInUser, client
                },
            ) => {
                let fileUrl = null;
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                console.log("loggedInUser", Boolean(loggedInUser));
                if (avartar) {
                    fileUrl = await uploadToS3(avartar, loggedInUser.id, "avartar")
                    // const { filename, createReadStream } = await avartar;
                    // const newFileName = loggedInUser.userName + Date.now() + filename
                    // const readStream = createReadStream();
                    // const writeStream = createWriteStream(process.cwd() + '/uploads/' + newFileName);
                    // fileUrl = `http://localhost:4000/static/${newFileName}`
                    // readStream.pipe(writeStream);
                }
                const updateUser = await client.user.update({
                    where: {
                        id: loggedInUser.id
                    },
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        ...(uglyPassword && { password: uglyPassword }),
                        bio,
                        ...(avartar && { avartar: fileUrl }),
                    }
                });
                if (updateUser.id) {
                    return {
                        ok: true,
                    }
                } else {
                    return {
                        ok: false,
                        error: '프로필 수정에 취소했습니다.'
                    }
                }


            }
        ),
    },
};

export default resolvers;