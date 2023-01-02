import axios from 'axios';
const {
  URL_BACK,
  URL_FRONT
} = process.env;



export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const CLEAR_VIDEOGAME_DETAIL = 'CLEAR_VIDEOGAME_DETAIL';
export const CLEAR_HOME = 'CLEAR_HOME';
export const FILTER_VIDEOGAMES_BY_ORIGIN = 'FILTER_VIDEOGAMES_BY_ORIGIN';
export const FILTER_VIDEOGAMES_BY_GENRE = 'FILTER_VIDEOGAMES_BY_GENRE';
export const ORDER = 'ORDER';
export const LOADING = 'LOADING';

export const getVideogames = () => {
  return async function (dispatch) {
    dispatch(loading());
    let json = await axios.get('https://lojueguito-api.onrender.com/videogames');
    return dispatch({ type: GET_VIDEOGAMES, payload: json.data })
  }
};

export const getVideogamesByName = (name) => {
  return async function (dispatch) {
    dispatch(loading());
    try {
      let json = await axios.get(`https://lojueguito-api.onrender.com/videogames?name=${name}`);
      return dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: json.data })  
    } catch (error) {
      return new Error('No se encontró ningún juego con ese nombre.')
    }
  }
};

export const getVideogameDetail = (id) => {
   return async function (dispatch) {
     await fetch(`https://lojueguito-api.onrender.com/videogame/${id}`)
      .then((response) => response.json())
      .then((json) => {
          dispatch({ type: GET_VIDEOGAME_DETAIL, payload: json });
      });
  };
};

export function clearVideogameDetail() {
  return {
    type: CLEAR_VIDEOGAME_DETAIL,
  };
}

export function clearHome() {
  return {
    type: CLEAR_HOME,
  };
}

export const createVideogame = (data) => {
  return async function (dispatch) {
    let json = await axios.post('https://lojueguito-api.onrender.com/videogames', data);
    return json;
  }
};

export const getGenres = () => {
  return function (dispatch) {
    fetch('https://lojueguito-api.onrender.com/genres')
      .then((response) => response.json())
      .then((json) => {
        return dispatch({ type: GET_GENRES, payload: json });
      });
  };
};

export const getPlatforms = () => {
  return function (dispatch) {
    fetch('https://lojueguito-api.onrender.com/platforms')
      .then((response) => response.json())
      .then((json) => {
        return dispatch({ type: GET_PLATFORMS, payload: json });
      });
  };
};

export const filterVideogamesByOrigin = (payload) => {
  return {
    type: FILTER_VIDEOGAMES_BY_ORIGIN,
    payload
  }
};

export const filterVideogamesByGenre = (payload) => {
  return {
    type: FILTER_VIDEOGAMES_BY_GENRE,
    payload
  }
};

export function loading() {
  return {
    type: LOADING,
  };
}

export const ordered = (payload) => {
  return {
    type: ORDER,
    payload
  }
}
