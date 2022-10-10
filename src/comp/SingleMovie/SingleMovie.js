import "./SingleMovie.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";

const style = {
  overflow: 'hidden',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  maxheight: 500,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const SingleMovie = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [movieId, setMovieId] = React.useState("")
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [movieDescription, setMovieDescription] = React.useState([])


  const getMovieDescription = async (movieId) => {
    if (movieId) {
      setLoading(true)
      try {
        const url = `https://movie-task.vercel.app/api/movie?movieId=${movieId}`;
        const response = await fetch(url);
        const responseJson = await response.json()
        setMovieDescription(responseJson.data)
        setOpen(true)
      } catch (err) {
        setError(true)
        console.log("error", err)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovieDescription(movieId)
  }, [movieId])

  const { original_title, poster_path, overview} = movieDescription;
  return (
    <>
      {error ?
        <ErrorModal />
        : <>
        
          {props.movies.map((movie) => (
            <div className='image-container d-flex justify-content-start' key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                width={'130px'}
                height={'195px'}
                alt='movie'
                loading="lazy"
                onClick={() => setMovieId(movie.id)} />
            </div>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {loading ? "loading.." : <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {original_title}
                  {console.log(movieDescription)}
                </Typography>

                <img
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  srcSet={`https://image.tmdb.org/t/p/original${poster_path}`}
                  width="150px"
                  height="190px"
                  alt="imagefile"
                  loading="lazy"
                />

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {overview}
                </Typography>
              </>}

            </Box>
          </Modal>
        </>}

    </>
  );
};

export default SingleMovie;
