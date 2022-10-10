import React, { useContext, useEffect, useState } from "react";

// const API_URI = `https://movie-task.vercel.app/api/movie?movieId=634649`

export const API_URI = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

// we need to create aprovider
const AppProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] =useState({ show: "flase", msg: ""});
    const [query, setQuery] = useState("titanic");

    const getMovies =async(url) =>{
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setIsError({
                    msg: data.Error,
                });
                setMovie(data.Search);
            } else{
                setIsError({
                    show: true,
                    msg:data.Error,
                })
            }
        }catch (error){
            console.log(error)
        }
    };

  useEffect(()=>{
    let timerOut = setTimeout(()=>{
            getMovies(`${API_URI}&s=${query}`);  
        }, 500);

        return () => clearTimeout(timerOut);
       
    },[query]);

  return  <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery}}> {children} </AppContext.Provider>
  
};


// Global custom hooks
const useGlobalContext =() => {
    return useContext(AppContext);
};



export {AppContext, AppProvider, useGlobalContext};