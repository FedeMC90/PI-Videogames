import React from "react";
import { useState, useEffect } from "react";
import { 
  getVideogames, 
  filterVideogamesByOrigin, 
  filterVideogamesByGenre, 
  getGenres, 
  ordered,
  clearHome
} from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import './Home.css';
import load from '../../Media/Loading.gif';
import Paginado from "../Paginado/Paginado";

const Home = () => {
  // Hooks: Con el useSelector me traigo lo que hay en el estado de videogames
  const videogames = useSelector ((state) => state.videogames);
  const genres = useSelector ((state) => state.genres);
  
  const [order, setOrder] = useState('');
  // Creo un estado local que me guarde mi página actual
  const [currentPage, setCurrentPage] = useState(1); 
  // En este estado guardo la cantidad de juegos que quiero por página
  const videogamesPerPage = 15
  const indexOfLastVideogame = currentPage * videogamesPerPage; 
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; 
  const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  } 

  const dispatch = useDispatch();
  
  // Traigo los videojuegos y los géneros cuando el componente se monta
  useEffect (() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);
  
  const noHayJuegos = () => {
    alert('No se encontraron juegos con ese nombre.')
    dispatch(getVideogames());
  }

  let loading = useSelector (state => state.loading);

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(ordered(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
  }
  
  const handleFilterOrigin = (e) => {
    dispatch(filterVideogamesByOrigin(e.target.value))
  }

  const handleFilterGenre = (e) => {
    dispatch(filterVideogamesByGenre(e.target.value))
  } 

  const limpiar = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
    dispatch(clearHome());
  }
return (
  <div id="home">
    <div id="orden">
      <Paginado
        videogamesPerPage={videogamesPerPage}
        videogames={videogames.length}
        paginado={paginado}
      />
      <button id='limpiar' onClick={(e) => limpiar(e)}>Limpiar</button>
      <select className="inputorden" defaultValue='ordenar' onChange={e => handleOrder(e)}> {/* Ordenamiento */}
        <option disabled value='ordenar'>Ordenar</option>
        <option key='atoz' value='atoz'>A-Z</option>
        <option key='ztoa'value='ztoa'>Z-A</option>
        <option key='0to5'value='0to5'>0-5</option>
        <option key='5to0'value='5to0'>5-0</option>
      </select>
      <label className="labelorden">Origen: {/* Filtro por origen */}
      <select className="inputorden" onChange={e => handleFilterOrigin(e)}> {/* Filtro por origen */}        
        <option key='todos' value='todos'>Todos</option>
        <option key='api' value='api'>API</option>
        <option key='propios' value='propios'>Propios</option>
      </select>
      </label>
      <label className="labelorden">Género: {/* Filtro por género */}
        <select className="inputorden" onChange={e => handleFilterGenre(e)}>
          <option key='todos' value='todos'>Todos</option>
          {genres.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}          
        </select>
      </label>
    </div>
    <div id='videogamecard'>
    {loading ? <img id="load" src={load} alt="Loading..."/> : 
      currentVideogames && typeof currentVideogames === 'string' ? 
      noHayJuegos() : currentVideogames.map(m => {
        return (          
        <VideogameCard 
          key={m.id}
          id={m.id}
          name={m.name}
          genres={m.genres}
          background_image={m.background_image}/>
    )})}
    </div>
    
  </div>
)
}

export default Home;
