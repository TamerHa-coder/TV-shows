import React ,{ useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import axios from 'axios';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"

function OneShow() {
  const [show, setShow] = useState({});
  const [seasons, setSeasons] = useState(0);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState("");
  
  const { id } = useParams(); //this is the selected show id
 
  useEffect (() => {
    (async() => {
      try{
        const checkLiked = localStorage.getItem(id);
        if (checkLiked==='liked'){
          setLiked(true)
        }
        const { data } = await axios.get(`https://www.episodate.com/api/show-details?q=${id}`);
        const showData = data.tvShow;
        setShow(showData);
        setSeasons(showData.episodes[showData.episodes.length-1].season);
        const rating = Number(showData.rating);
        if(rating >=8){
          setRating('green');
        } else if(rating >=6){
          setRating('yellow');
        } else {
          setRating('red');
        }
      } catch (error){
        console.log(error.message);
      }
    })();
  }, [id]);
    
  const handleLiked = () =>{
    if(liked){
      localStorage.setItem(id,"not-liked");
    }else{
      localStorage.setItem(id,"liked");
    }
    setLiked(!liked)
  }


  return (
    show.name?
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          alt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
      </Link>
      <div className='like-div' onClick={handleLiked} >
        {
          liked ?
      <img className="interaction-img" src={likedImg} alt='liked'/>
    :
    <img className="interaction-img" src={notLikedImg} alt='not liked'/>
    }
    </div>
    <div className="one-show-img-and-title">
  <h2>{show.name}</h2>
  {console.log(show.genres)}
  <img className='one-show-img' src={show.image_path} alt={show.name}/>
  <div className='one-show-footer'>
  <div className='seasons'>{seasons} seasons</div>
    <div className="genres">
      {show.genres.map(genre=><span className="genre" key={genre}>{genre}</span>)}
    </div>
    <div className='rating'>Rating:
      <span className={rating}>
      {show.rating.toString().slice(0,3)}
      </span>
    </div>
    <div className='show-status'>
  status: <span className='status'>{show.status}</span>
    </div>
    </div>  
    </div>
    <div className='one-show-description'>
      <h2>description:</h2>
      {show.description}
    </div>
    </div>
    :
    <h2>loading...</h2>
  );
}

export default OneShow;
