import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
// import lightbox from "./js/lightbox";
// import navbar from "./js/navbar";

// import './css/lightbox.css';
// import './css/navbar.css';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { motion } from "framer-motion";
import "./App.css";
import SearchIcon from "./search.svg";
import {
  textVariants,
  sliderVariants,
  fadeInAnimationVariants,
  hoverVariants,
} from "./js/framer-motion";

import { Toggle } from "./components/Toggle";
import CardSkeleton from "./components/CardSkeleton";


import useLocalStorage from "use-local-storage";

// api key: 781d4ca
// call the data from the movies

const API_URL = "http://www.omdbapi.com?apikey=781d4ca";
// use it from our component for the data, which hook we use

const App = () => {
  // map over them and create a new state use state hook, give us access to the set movies function and we pass the data.search into movie, now can pass the data.search into our set movies
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    setIsLoading(true)
    // call a function that will fetch the movies
    const response = await fetch(`${API_URL}&s=${title}`);
    // now have to get the data from it
    const data = await response.json();
    // this returns the movies from the search
    setIsLoading(false)
    console.log(data)
    setMovies(data.Search);
  };
  // This function handles the key press event

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //the enter key was pressed
      searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    const storedMovies = localStorage.getItem("searchTerm");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      searchMovies("");
    }
  }, []);

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="app">
      <SkeletonTheme baseColor="313131" highlightColor="#525252">
        <motion.h1
          variants={textVariants}
          initial="initial"
          animate="animate"
          data-theme={isDark ? "dark" : "light"}
        >
          Movie Land ארץ הסרטים
        </motion.h1>
        <Toggle
          isChecked={isDark}
          // make the opposite value
          handleChange={() => setIsDark(!isDark)}
        ></Toggle>
        <motion.div
          variants={sliderVariants}
          initial="initial"
          animate="animate"
          className="search"
          data-theme={isDark ? "dark" : "light"}
        >
          <motion.input
            variants={hoverVariants}
            initial="initial"
            animate="animate"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          >
            {/* make it changeable to call our api */}
          </motion.input>
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          ></img>
        </motion.div>

        {/* {isLoading && <CardSkeleton cards={8} />} */}
        {/* check if movies  */}
        {movies?.length > 0 ? (
          <div className="container">
            <CardSkeleton cards={8}/>
            {/* https://www.youtube.com/watch?v=g74Q0wRc6BQ */}
            {/* call it as a self closing component, makes it easier when we map over all the movies, getting our movies from the console log to the component, this allows to populate the movies, render it as a movie card  */}
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <h2>No movies found. אין סרטים להציג</h2>
          </motion.div>
        )}
      </SkeletonTheme>
      {/* need to extract the code to its custom component */}
    </div>
  );
};
// have to export every one of our components and call it elsewhere
export default App;
