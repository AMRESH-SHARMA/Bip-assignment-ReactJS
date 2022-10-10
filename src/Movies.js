import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './Context'
import "./App.css"

export default function Movies() {
  const {movie, isLoading} =useGlobalContext();
  
  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }
  return (
   
    <section className='movie-page'>
    <div className='container grid grid-4-col'>{movie.map((curMovie)=>{
      const { imdbID,Title, Poster} = curMovie;
      const MovieName = Title.substring(0, 15);
      return (
         <NavLink to={`/movie/${imdbID}`} key={imdbID}>
        <div className='card'>
        <div className='card-info'>
          <h2>{MovieName.length >= 15 ? `${MovieName} ...` :MovieName }</h2>
          <img src={Poster} alt={imdbID} />
        </div>
        </div>
      </NavLink>
      )
      
      
    })}
      </div>
</section>
    
  )
}
