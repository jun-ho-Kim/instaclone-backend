import { PrismaClient, User } from "@prisma/client";

export type Context = {
    loggedInUser?: User
    client: PrismaClient
}

export type Resolver = (
    root: any,   
    args: any, 
    context: Context, 
    info: any
) => any;

// 수십개가 될 Resolver의 타입을 하나하나 지정해주는 건 매우 힘든 일이다.
// 그래서 아래와 같이 코드를 작성한다.
export type Resolvers = {
    //이 경우에는 query, mutation, subscription등이 될 것이다.
    [key: string]: {
        // 여기는 함수를 가지며, Resolver type을 return 할 것이다.
        //Resovler type은 기본적으로 function이 될 것이다.
        // 기본적으로 graphQL withFilter function이 될 것이다.
        [key: string] : Resolver
    }

}