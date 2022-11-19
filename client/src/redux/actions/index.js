import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const CLEAR_VIDEOGAME_DETAIL = 'CLEAR_VIDEOGAME_DETAIL';
export const FILTER_VIDEOGAMES_BY_ORIGIN = 'FILTER_VIDEOGAMES_BY_ORIGIN';
export const FILTER_VIDEOGAMES_BY_GENRE = 'FILTER_VIDEOGAMES_BY_GENRE';
export const LOADING = 'LOADING';

export const getVideogames = () => {
  return async function (dispatch) {
    dispatch(loading());
    let json = await axios.get('http://localhost:3001/videogames');
    return dispatch({ type: GET_VIDEOGAMES, payload: json.data })
  }
};

export const getVideogamesByName = (name) => {
  return async function (dispatch) {
    dispatch(loading());
    let json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: json.data })
  }
};

export const getVideogameDetail = (id) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogame/${id}`)
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

export const createVideogame = (data) => {
  return async function (dispatch) {
    //let json = await axios.post('http://localhost:3001/videogames');
    return dispatch({ type: GET_VIDEOGAMES, payload: data })
  }
};

export const getGenres = () => {
  return function (dispatch) {
    fetch('http://localhost:3001/genres')
      .then((response) => response.json())
      .then((json) => {
        return dispatch({ type: GET_GENRES, payload: json });
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
