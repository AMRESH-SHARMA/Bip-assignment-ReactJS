import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import SingleMovie from '../SingleMovie/SingleMovie';

import SearchBox from '../SearchBox/SearchBox';
import './GridMovies.css';

const GridMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovies = async () => {
    if (localStorage.getItem('cachedMovies')) {
      setMovies(JSON.parse(localStorage.getItem('cachedMovies')));
      // console.log(JSON.parse(localStorage.getItem('cachedMovies')))
    } else {
      try {
        const url = `https://movie-task.vercel.app/api/popular?page=1`;
        const response = await fetch(url);
        const responseJson = await response.json();
        console.warn(responseJson.data)
        if (responseJson.data.results) {
          setMovies(responseJson.data.results);
          localStorage.setItem('cachedMovies', JSON.stringify(responseJson.data.results));
        }
      } catch (err) {
        console.log("error", err)
      }
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  ////////////////////////////////////////////////////////////

  // const getMovieRequest = async (searchValue) => {
  // 	const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

  // 	const response = await fetch(url);
  // 	const responseJson = await response.json();
  //   console.warn("2",responseJson)

  // 	if (responseJson.Search) {
  // 		setMovies(responseJson.Search);
  // 	}
  // };

  // useEffect(() => {
  // 	getMovieRequest();
  // }, []);

  return (<>
    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    <Grid container className='movie-app'>
      <SingleMovie movies={movies} />
    </Grid>
  </>

  );
};

export default GridMovies;

