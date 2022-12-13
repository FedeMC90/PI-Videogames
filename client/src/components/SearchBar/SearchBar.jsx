import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogamesByName, clearHome } from '../../redux/actions';
import './SearchBar.css';

export default function SearchBar({onSearch}) {
  const [name, setName] = useState('');
  const videogames = useSelector((state) => state.videogames)

  function handleInputChange (e) {
    setName(e.target.value);
  }

  let dispatch = useDispatch();

  return <div id='searchbar'> 
    
    <form onSubmit={(e) => {  //en react por default se devuelve falso, por lo tanto hay que evitar eso con el metodo 
      e.preventDefault();     //preventDefault.
      dispatch(clearHome());
      dispatch(getVideogamesByName(name));         //manda a buscar el juego ingresado por el usuario
      setName('');            //blanquea el input
      }}>
      <div> 
        <input id="input"  type="text" placeholder='Name...' onChange={handleInputChange} value={name}/> 
        <button  id='boton' type="submit">Search</button>
      </div>
    </form>
  </div>
};