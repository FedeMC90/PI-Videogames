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
  FILTER_VIDEOGAMES_BY_GENRE,
  ORDER,
  GET_PLATFORMS,
  CLEAR_HOME
} from '../actions';

const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: {},
  genres: [],
  platforms: [],
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
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };  
    case CLEAR_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: {},
      };
      case CLEAR_HOME:
        return {
          ...state,
          videogames: [],
        };    
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        loading: false,
        videogameDetail: action.payload,
      };
    case FILTER_VIDEOGAMES_BY_ORIGIN:
      const videogamesOrigin = state.allVideogames;
      const filteredByOrigin = action.payload === 'todos' ? videogamesOrigin : 
        action.payload === 'api' ? videogamesOrigin.filter(e => !isNaN(e.id)) :
        videogamesOrigin.filter(e => isNaN(e.id))
      return {
        ...state,
        videogames: filteredByOrigin
      };
    case FILTER_VIDEOGAMES_BY_GENRE:
      const videogamesGenre = state.allVideogames;
      const filteredByGenre = action.payload === 'todos' ? videogamesGenre : 
        videogamesGenre.filter(e => e.genres.some(e => e.name === action.payload));
      return {
        ...state,
        videogames: filteredByGenre
      };   
    case CREATE_VIDEOGAME:
      return {
        ...state,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ORDER:
      let orderVideogames = action.payload === 'atoz' ?
        state.videogames.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        }) : action.payload === 'ztoa' ?
        state.videogames.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        }) : action.payload === '0to5' ?
        state.videogames.sort((a, b) => {
          if (a.rating > b.rating) return 1;
          if (a.rating < b.rating) return -1;
          return 0;
        }) : action.payload === '5to0' ?
        state.videogames.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        }) : state.allVideogames
        
      return {
        ...state,
        videogames: orderVideogames,
      }
    default:
      return state;
  }
};
