import React from 'react';
import './Paginado.css';

function Paginado({videogamesPerPage, videogames, paginado}) {
  const pageNumbers = [];                         

  for (let i=1; i<=Math.ceil(videogames/videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <nav>
      <ul id='paginado'>
        {pageNumbers && pageNumbers.map(number => (
          <li id='number' key={number}>
            <button id='link' onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Paginado