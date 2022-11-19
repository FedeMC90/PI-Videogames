import React from "react";
import { useState, useEffect } from "react";
import { getVideogames, filterVideogamesByOrigin, filterVideogamesByGenre, getGenres } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import './Home.css';
import load from '../../Media/Loading.gif';
import Paginado from "../Paginado/Paginado";

const Home = () => {
  // Hooks: Con el useSelector me traigo lo que hay en el estado de videogames
  const videogames = useSelector ((state) => state.videogames);
  const genres = useSelector ((state) => state.genres);
  
  // Creo un estado local que me guarde mi página actual
  const [currentPage, setCurrentPage] = useState(1); 
  // En este estado guardo la cantidad de juegos que quiero por página
  const [videogamesPerPage, setVideogamesPerPage] = useState(15); 
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
  }, []);
  
  // Así sería con clase
  // componentDidMount() {
  //   this.props.getVideogames();
  // }

  let loading = useSelector (state => state.loading);

  const handleFilterOrigin = (e) => {
    dispatch(filterVideogamesByOrigin(e.target.value))
  }

  const handleFilterGenre = (e) => {
    dispatch(filterVideogamesByGenre(e.target.value))
  } 

return (
  <div id="home">
    <div id="orden">
      <Paginado
        videogamesPerPage={videogamesPerPage}
        videogames={videogames.length}
        paginado={paginado}
      />
      <label>Ordenar: 
      <select> {/* Ordenamiento */}
        <option value='atoz'>A-Z</option>
        <option value='ztoa'>Z-A</option>
        <option value='0to5'>0-5</option>
        <option value='5to0'>5-0</option>
      </select>
      </label>
      <label>Origen: 
      <select onChange={e => handleFilterOrigin(e)}> {/* Filtro por origen */}        
        <option value='todos'>Todos</option>
        <option value='api'>API</option>
        <option value='propios'>Propios</option>
      </select>
      </label>
      <label>Género: {/* Filtro por género */}
        <select id='genres' onChange={e => handleFilterGenre(e)}>
          <option value='todos'>Todos</option>
          {genres.map(e => <option value={e.name}>{e.name}</option>)}          
        </select>
      </label>
    </div>
    
    {loading ? <img id="load" src={load} alt="Loading..."/> :
    currentVideogames && 
      currentVideogames.map(m => {
        return (
        <VideogameCard 
          key={m.id}
          id={m.id}
          name={m.name}
          genres={m.genres}
          background_image={m.background_image}/>
    )})}
    
  </div>
)
}

export default Home;
