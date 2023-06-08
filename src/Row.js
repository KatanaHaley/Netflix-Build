import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl, {
         headers: {
          //  'Authorization': 'Basic a2F0YW5haGFsZXk6bWFuaWZlc3Q='
         }
      });
      
      setMovie(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

//console.log(movie)
  const opts ={
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error) => console.log(error));
    } 
  }

  return (
    <div className="row">
      <h2>{title}</h2>
 
      <div className="row_posters">
        {movie.map((movie) => (
            <img
              className={`new_rowPoster ${isLargeRow}`}
                // className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                onClick={() => handleClick(movie)}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            ))}
            {/* <YouTube videoId={trailerUrl} opts={opts} /> */}
      </div>
      
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {console.log(movie.video)}
    </div>
  );
}

export default Row;
