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
      <div id='primer'>
        <h2>{detail.name}</h2>
        <img src={detail.background_image} width='400' height='250' alt={detail.name}/>
      </div>
      <h5>Rating: {detail.rating}</h5>
      <h5>Released: {detail.released}</h5>
      <p id="description">{detail.description}</p>
      {/* <h5>{detail.genres}</h5> */}
      {/* <h5>{detail.platforms}</h5> */}
    </div>
  );
};


export default VideogameDetail;