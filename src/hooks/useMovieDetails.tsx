import { useEffect, useState } from "react";
import { MovieFull } from '../interfaces/movieInterface';
import movieDB from '../api/movieDB';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

// interface de como quiero que se vea mi hook
interface MovieDetails {
    isLoading:boolean,
    movieFull?:MovieFull,
    cast: Cast[],
}

export const useMovieDetails = (movieId:number) => {
    // useState de tipo MovieDetails (es decir, no aceptará otra propiedad que no esté en la interface de MovieDetails)
    const [state, setState] = useState<MovieDetails>({
        isLoading:true,
        movieFull:undefined,
        cast: []
    });

    // Llamada al API al endpoint
    const getMovieDetails = async()=>{
        // llamamos a la database creada anteriormente por nosotros (movieDB) y accedemos al metodo get de tipo MovieFull (los params solo recibirán el tipo de data de MovieFull y agregamos al path que queremos llamar)
        const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);
        
        const [movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailsPromise,castPromise]);

        setState({
            isLoading:false,
            movieFull:movieDetailsResp.data,
            cast:castPromiseResp.data.cast
        });
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
    
};
