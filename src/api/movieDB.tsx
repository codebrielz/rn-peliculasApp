import axios from 'axios';

// Creamos la llamada al API con axios.create, movieDB me servirá para hacer la peticion externa a este archivo y de aqui hacer la llamada al API
const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    // params son los parametros que necesito o quiero de la API, por ejemplo, necesito mi API_KEY para poder acceder al API y el LANGUAGE lo quiero en español.
    params:{
        api_key:'dbc87320d3713f3505005c0e6d0be3c3',
        language:'es-ES'
    }
})

export default movieDB;
