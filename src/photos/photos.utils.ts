export const processHastags = (caption) => {
    const hashtags = caption.match(/#[\w]+/g) || []; // hashtag가 없는 경우 []를 return
    return hashtags.map(hashtag => ({
        where: { hashtag },
        create: { hashtag }
    }))
}