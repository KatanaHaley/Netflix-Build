import axios from "axios";
 

const instance = axios.create({
    baseUrl: "https://api.themoviedb.org/3/discover" 
})

export default instance;

//https://api.themoviedb.org/3/movie/550?api_key=7138600d099a7db59080cee1110875fb

//"https://api.themoviedb.org/3"