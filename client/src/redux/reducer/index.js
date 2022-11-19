//action types
import { 
  GET_VIDEOGAMES, 
  GET_VIDEOGAMES_BY_NAME,
  GET_VIDEOGAME_DETAIL,
  GET_GENRES, 
  CREATE_VIDEOGAME,
  CLEAR_VIDEOGAME_DETAIL,
  LOADING,
  FILTER_VIDEOGAMES_BY_ORIGIN,
  FILTER_VIDEOGAMES_BY_GENRE
} from '../actions';

const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: {},
  genres: [],
  loading: false,
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        loading: false,
        videogames: action.payload,
        allVideogames: action.payload
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        loading: false,
        videogames: action.payload,
      };  
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case CLEAR_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: {},
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case FILTER_VIDEOGAMES_BY_ORIGIN:
      const videogamesOrigin = state.allVideogames;
      const statusFilteredOrigin = action.payload === 'todos' ? videogamesOrigin : 
        action.payload === 'api' ? videogamesOrigin.filter(e => !isNaN(e.id)) :
        videogamesOrigin.filter(e => isNaN(e.id))
      return {
        ...state,
        videogames: statusFilteredOrigin
      };
    case FILTER_VIDEOGAMES_BY_GENRE:
      const videogamesGenre = state.allVideogames;
      const statusFilteredGenre = action.payload === 'todos' ? videogamesGenre : 
        videogamesGenre.filter(e => e.genres.some(e => e.name === action.payload));
      return {
        ...state,
        videogames: statusFilteredGenre
      };   
    case CREATE_VIDEOGAME:
//adaptarlo a la base de datos
      return {
        ...state,
        //videogame: state.videogames.concat(action.payload),
        videogame: fetch()
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
