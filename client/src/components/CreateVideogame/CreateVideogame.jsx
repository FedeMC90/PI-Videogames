import React from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

{/* Adaptar esto a la base de datos */}
const CreateVideogame = () => {
  const initialState = {
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: "",//{name: "",},
    genres: "", //{name: ""},
    image: ""
  }

  let [videogame, setVideogame] = React.useState(initialState);
  
  let dispatch = useDispatch();

  let handleOnChange = (e) => {
    // if(e.target.name === "platforms") {
    //   setVideogame({...videogame, platforms: {id: e.target.value}})
    // } else if (e.target.name === "genres") {
    //   setVideogame({...videogame, genres: {id: e.target.value}})
    // } else {
    //   setVideogame({...videogame, [e.target.name]: e.target.value})
    // }
    setVideogame({...videogame, [e.target.name]: e.target.value})
  };

  let handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createVideogame(videogame))
    setVideogame(initialState);
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Nombre: </label> {/* Agregar validación que no exista ya */}
        <input type="text" name="name" value={videogame.name} onChange={handleOnChange}></input>
        <label>Descripción: </label> {/* 50 caracteres mínimo */}
        <input type="text" name="description" value={videogame.description} onChange={handleOnChange}></input>
        <label>Fecha de lanzamiento: </label> {/* Tiene que ser menor a today */}
        <input type="date" name="released" value={videogame.released} onChange={handleOnChange}></input>
        <label>Rating: </label> {/* Entre 0 y 5 */}
        <input type="float" name="rating" value={videogame.rating} onChange={handleOnChange}></input>
        <label>Plataformas: </label> {/* Igual que géneros */}
        <input type="text" name="platforms" value={videogame.platforms} onChange={handleOnChange}></input>
        <label>Géneros: </label> {/* Que muestre un input que permita escribir con las opciones que hay en la db y un botón que sea "Agregar género" y me renderice otro input más. */}
        <input type="text" name="genres" value={videogame.genres} onChange={handleOnChange}></input>
        <label>Imágen: </label> 
        <input type="text" name="image" value={videogame.image} onChange={handleOnChange}></input>
        <button disabled={!videogame.name || !videogame.description || !videogame.platforms} type="submit">Create Videogame</button>
      </form>
    </div>
  );
};


export default CreateVideogame;
