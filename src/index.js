import React from 'react';
import ReactDOM from 'react-dom';
import GridMovies from './comp/GridMovies/GridMovies';
import Header from './comp/Header/Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <GridMovies />
  </React.StrictMode>,
  document.getElementById('root')
);
