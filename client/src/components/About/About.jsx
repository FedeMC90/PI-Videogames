import React from 'react';
import './About.css';

function About() {
  return (
    <div id='aboutpage'>
      <div id='col1'>
        <h1 id='hola'>The Creator</h1>
        <img id='fotito' height='300rem' src='https://p16-amd-va.tiktokcdn.com/musically-maliva-obj/7873f2a00263fd2f5b6147c626193f9f~c5_720x720.jpeg' alt='Fede'/>
      </div>
      <div id='col2'>
        <h3>Federico M. Ciociano</h3>
        <h5>Released: 15/04/1990</h5>
        <h5>Mail: fedemc90@gmail.com</h5>
        <p>Programador por naturaleza. Dedicó 6 años de su vida practicando las antiguas escrituras en C. Un buen día, abatido por la rutina y la falta de reconocimiento, emprendió el viaje de su vida con el fin de transitar nuevos Nortes. Entrenándose en nuevas disciplinas tales como el arte de la música, la carpintería y las ventas, desarrolló así un amplio abanico de habilidades y destrezas tanto técnicas como interpersonales.<br/>Hoy, 6 años después, volvió. Resurgido de entre sus cenizas, con hambre de gloria y riquezas.</p>
        <p id='segundoparrafo'>Dispuesto a combatir sin doblegarse ante ningún obstáculo. Aún no se ha creado desafío tan grande que él no pueda aprender a superar.</p>
        <a id='linkedin'target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/federico-ciociano-b0a6801a2/'>LinkdeIn</a>
      </div>
    </div>
  )
}

export default About