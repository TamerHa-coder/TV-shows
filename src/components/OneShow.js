import React ,{ useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import axios from 'axios';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"

function OneShow() {

  const { id } = useParams(); //this is the selected show id
 
    

  return (
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          alt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
      </Link>
      {/*
      
        insert your code here 
      
      
      */}
    </div>
  );
}

export default OneShow;
