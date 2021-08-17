import * as jwt from 'jsonwebtoken';
import client from "../client";
import { Resolver } from '../types';

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        const { id }: any = await jwt.verify(token, process.env.SECRET_KEY);
        const IntId = id;
        const user = await client.user.findUnique({ where: { id: IntId } });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

export const protectResolver = (ourResolver: Resolver) => (root, args, context, info) => {
    const query = info.operation.operation === 'query'

    if (!context.loggedInUser) {
        if (query) {
            return null
        } else {
            return {
                ok: false,
                error: "유저를 찾을 수 없습니다."
            }
        }
    };

    return ourResolver(root, args, context, info)
}