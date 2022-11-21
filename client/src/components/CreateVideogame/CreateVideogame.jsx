import React from "react";
import { useEffect } from "react";
import { createVideogame, getGenres, getPlatforms, getVideogames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './CreateVideogame.css';

{/* Adaptar esto a la base de datos */}
const CreateVideogame = () => {
  const initialState = {
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    background_image: ""
  }

  let platforms = useSelector((state) => state.platforms);
  let genres = useSelector((state) => state.genres);
  let allVideogames = useSelector((state) => state.allVideogames)
  let [videogame, setVideogame] = React.useState(initialState);
  
  let dispatch = useDispatch();

  useEffect (() => {
    dispatch(getVideogames());
    dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);

  // Compruebo que la fecha sea menor a hoy cuando salgo del input 
  let handleOnBlur = (e) => {
    if (e.target.name === 'released') {
      let today = new Date();
      today = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
      
      if (e.target.value > today) {
        alert(`La fecha de lanzamiento debe ser menor a ${today}`)
        e.target.value = '';
      }
    } 
    // else if (e.target.name === 'name') {
    //   if (e.target.value) {
    //     if (allVideogames.length) {
    //       if (allVideogames.find(e => e.name.toUpperCase() === e.target.value.toUpperCase())) {
    //         alert('Ya hay un juego creado con este nombre!')
    //         e.target.value = '';
    //       }
    //     } 
    //   }
    // }
  };

  {/* MANEJO DEL ONCHANGE */}
  let handleOnChange = (e) => {
    e.preventDefault();
    if(e.target.name === "platforms") {
      videogame.platforms.find(({name}) => name === e.target.value) ?
        alert(`La plataforma ${e.target.value} ya fue ingresada`) :
        setVideogame({...videogame, platforms: [...videogame.platforms, {name: e.target.value}]})
    } else {
      if (e.target.name === "genres") {
        videogame.genres.find(({name}) => name === e.target.value) ?
          alert(`El género ${e.target.value} ya fue ingresado`) :
          setVideogame({...videogame, genres: [...videogame.genres, {name: e.target.value}]})
      } else {
        if (e.target.name === 'rating') {
          if (e.target.value > 5 || e.target.value < 0) {
            alert('El valor ingresado debe ser entre 0 y 5')
            e.target.value = ''
          }
          setVideogame({...videogame, [e.target.name]: e.target.value})
        } else  
          setVideogame({...videogame, [e.target.name]: e.target.value})
      }
    }
  };

  {/* MANEJO DEL SUBMIT */}
  let handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideogame(videogame))
    alert('El juego fue creado exitosamente!')
    setVideogame(initialState);
  }

  const handleDeletePlatform = (el) => {
    setVideogame ({
      ...videogame,
      platforms: videogame.platforms.filter(e => e.name !== el)
    })
  }

  const handleDeleteGenre = (el) => {
    setVideogame ({
      ...videogame,
      genres: videogame.genres.filter(e => e.name !== el)
    })
  }

  return (
    <div>
      <h1 id='creacion'>Creación de videojuego</h1>
      <form>
        <div id="createform">
          <div className="input">
            <label>*Nombre: </label> {/* NAME */}
            <input 
              type="text" 
              name="name" 
              value={videogame.name} 
              onChange={(e) => handleOnChange(e)} 
              onBlur={e => handleOnBlur(e)}>
            </input>
          </div>
          <div className="input" id="descr">
            <label>*Descripción: </label> {/* DESCRIPTION */}
            <textarea 
              rows="7" 
              cols="28" 
              name="description" 
              value={videogame.description} 
              onChange={(e) => handleOnChange(e)}>
            </textarea>
          </div>
          <div className="input">
            <label>Fecha de lanzamiento: </label> {/* RELEASED */}
            <input 
              type="date" 
              name="released" 
              value={videogame.released} 
              onChange={(e) => handleOnChange(e)} 
              onBlur={e => handleOnBlur(e)}>
            </input>
          </div>
          <div className="input">
            <label>Rating: </label> {/* RATING */}
            <input 
              type="number" 
              step="0.1" 
              min='0' 
              max='5' 
              name="rating" 
              value={videogame.rating} 
              onChange={(e) => handleOnChange(e)}>
            </input>
          </div>
          <div className="input">
            <label>*Plataformas: </label> {/* PLATAFORMS */}
            <select 
              name="platforms" 
              multiple
              value={videogame.platforms} 
              onChange={(e) => handleOnChange(e)}>
              {platforms &&
                platforms.map(e => <option 
                                      key={e.name} 
                                      value={e.name}>{e.name}
                                    </option>)}
            </select>
          </div>
          <ul>
          {videogame.platforms.map(e => 
            <li key={e.name} className='delplat'>
              {e.name}
              <button 
                className='buttondel' 
                name='platformdelete' 
                onClick={() => handleDeletePlatform(e.name)}>x
              </button>
            </li>)}
          </ul>
          <div className="input">
            <label>*Géneros: </label> {/* GENRES */}
            <select 
              name="genres" 
              value={videogame.genres} 
              multiple
              onChange={(e) => handleOnChange(e)}>
              {genres.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
            </select>
          </div>
          <ul>
          {videogame.genres.map(e => 
            <li key={e.name} className='delplat'>
              {e.name}
              <button className='buttondel' name='genredelete' onClick={() => handleDeleteGenre(e.name)}>x</button>
            </li>)}
          </ul>
          <div className="input">
            <label>Imágen: </label> {/* BACKGROUND_IMAGE */}
            <input type="text" name="background_image" value={videogame.background_image} onChange={(e) => handleOnChange(e)}></input>
          </div>
          <button  id="submit" disabled={
            !videogame.name || 
            !videogame.description ||
            !videogame.genres.length ||
            !videogame.platforms.length}  onClick={(e) => handleOnSubmit(e)} type="submit">Create Videogame
          </button>
          <h5 id="datosobligatorios">* Datos obligatorios</h5>
        </div>
      </form>
    </div>
  );
};

export default CreateVideogame;
