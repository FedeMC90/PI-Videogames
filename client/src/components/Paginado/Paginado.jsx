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
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Paginado