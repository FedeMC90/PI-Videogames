import "./VideogameCard.css";
import React from 'react'
import { Link } from 'react-router-dom';

function VideogameCard(props) {
  return (
    <Link to={`/videogame/${props.id}`}>
      <div id="card">
        <h3>{props.name}</h3>
        <img src={props.background_image} width='400' height='250' alt={props.background_name}/>
        <p>Géneros</p> {/* Mapear para que muestre todos los géneros */}
      </div>  
    </Link>    
  )
}

export default VideogameCard