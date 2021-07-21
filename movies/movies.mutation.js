import client from '../client';

export default {
    Mutation: {
        createMovie: (_, {title, description, year}) => 
            client.movie.create({
                data: {
                    title, description, year
                }
            }),
        updateMovie: (_, {id, title, description, year}) => client.movie.update({data: {title, description, year}, where: {id}}),
        deleteMovie: (_, {id}) => 
            client.movie.delete({where: {id}})
           
    }
}