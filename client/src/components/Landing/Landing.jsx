import React from 'react'
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <>
      <h3>Bienvenide a</h3>
      <h1>LO JUEGUITO</h1>
      <Link to='/home'><button>Ingresar...</button></Link>
    </>
  )
}

export default Landing