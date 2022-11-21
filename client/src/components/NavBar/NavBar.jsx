import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar({onSearch}) {
  return (
    <div id='navbar'>

      <div id='titulo'>
        <Link to='/home' style = {{textDecoration: 'none'}} ><h1 id='lojueguito'>LO JUEGUITO</h1></Link>
        <p id='fede'>by <Link
            to='/about' 
            style={{textDecoration:'none'}} 
            id='about'> Federico M. Ciociano</Link></p>
      </div>

      <SearchBar id='searchbar' onSearch={onSearch}/>

      <Link to='/create' style = {{textDecoration: 'none'}}><button id='create'>Agregar juego</button></Link>
    </div>
  )
}

export default NavBar