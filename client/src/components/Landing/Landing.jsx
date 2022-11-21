import React from 'react'
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div id='landing'>
      <h1 id='lojueguitolanding'>LO JUEGUITO</h1>
      <Link to='/home'><button id='ingresar'>Ingresar...</button></Link>
    </div>
  )
}

export default Landing