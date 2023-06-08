import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Requests";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [toggle, setToggle] = useState(true)
  const handle = useFullScreenHandle();


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals, {
        headers: {
          'Authorization': "Basic a2F0YW5haGFsZXk6bWFuaWZlc3Q=",
        },
      });

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const image = `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`

  const opts ={
    height: "700vh",
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
    <>
    <div>
  
       <FullScreen handle={handle}>
          <div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          </div>
          </FullScreen>
    </div>
     <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
  
    
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">

          <button 
          className="banner_button"
          key={movie.id}
          onClick={() => handleClick(movie)}
          id="button"
          >Play
          </button>

          {/* <button className="banner_button"         
            // onClick={handleFullScreen}
            >My List
            </button> */}
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
    </>
  );
}

export default Banner;
