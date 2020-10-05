import React, { useState , useEffect } from 'react';
import Show from './Show';
import './Home.css';
import bg from '../video/popcorn.mp4';
import axios from 'axios';

function Home() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://www.episodate.com/api/most-popular")
      .then(res => res.json())
      .then(
        (result) => {
          setShows(result.tv_shows);
        },
      )
  }, []);

 

  const handleInputSubmit = async (input) => {
    input.preventDefault()
    if(search.length===0){
      const {data : shows} = await axios.get(
        `https://www.episodate.com/api/most-popular`
        );
      setShows(shows.tv_shows);
    }else{
      const {data : shows} = await axios.get(
        `https://www.episodate.com/api/search?q=${search}`
        );
         setShows(shows.tv_shows);
    }
  }



  return (
    <div className='app'>
      <video src={bg} playsInline autoPlay muted loop id='bgvid' />
      {/* If you want to know how to implement video as your background 
      you can take a look here: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
      <h1>The Best T.V Shows</h1>
      <form onSubmit={(e) =>handleInputSubmit(e)}>
        <input id="search-bar" placeholder="What show do you want to watch?" onChange={(e) => {setSearch(e.target.value)}}></input>
        <button id="submit-btn"> submit  </button>
      </form>
      <div className="top-shows">
      {shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
      </div>
    </div>
  );
}

export default Home;
