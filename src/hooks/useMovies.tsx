import { useEffect, useState } from "react";
import movieDB from '../api/movieDB';
import { MovieDBMoviesResponse, Movie } from '../interfaces/movieInterface';

interface moviesState {
    nowPlaying: Movie[],
    popular: Movie[],
    topRated: Movie[],
    upcoming: Movie[],
}
export const useMovies = () => {
    // Estado de carga
    const [isLoading, setIsLoading] = useState(true);
    // Estado de peliculas Actuales (en cine)
    const [moviesState, setMoviesState] = useState<moviesState>({
        nowPlaying:[],
        popular:[],
        topRated:[],
        upcoming:[],
    });

    const getMovies = async () => {
        // MULTIPLES PETICIONES DE FORMA SIMULTÁNEA
        // Llamada al API al endpoint '/now_playing'
        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');
        // Llamada al API al endpoint '/popular'
        const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
        // Llamada al API al endpoint '/top_rated'
        const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
        // Llamada al API al endpoint '/upcoming'
        const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

        // JAVASCRIPT nos ofrece Promise.all para realizar las peticiones de forma simultanea
        const response = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise]);
        // Pasamos al estado las respuestas del API
        setMoviesState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upcoming: response[3].data.results
        })
        // Una vez carga la data, pasa a false
        setIsLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);

    return {
        ...moviesState,
        isLoading
    }
};
