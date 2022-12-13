import React from "react";
import {getVideogameDetail, clearVideogameDetail} from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import './VideogameDetail.css';

const VideogameDetail = () => {
  let params = useParams()
  let dispatch = useDispatch();
  let detail = useSelector(state => state.videogameDetail)

  React.useEffect(() => {
    dispatch(getVideogameDetail(params.id))
    dispatch(clearVideogameDetail())
    
  }, [])

  return (
    <div id="detail">
      <div id='col1'>
        <h2>{detail.name}</h2>
        <img id='imgdetail' src={detail.background_image} width='400' height='250' alt={detail.name}/>
      </div>
      <div id='col2'>
        <h5>Rating: {detail.rating}</h5>
        <h5>Released: {detail.released}</h5>
        <p id="description">{detail.description}</p>
        <ul>
          {detail.genres && detail.genres.map(e => <li>{e.name}</li>)}
        </ul>
        <ul>
          {detail.platforms && detail.platforms.map(e => <li>{e.name}</li>)}
        </ul>
      </div>
    </div>
  );
};


export default VideogameDetail;