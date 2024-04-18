// jsx refers to a new react component 
import React from 'react';
import { motion } from "framer-motion";
import {
  textVariants,
  sliderVariants,
  fadeInAnimationVariants,
  hoverVariants,
} from "./js/framer-motion";
import Lightbox from "././components/lightbox";

// pass in the variables through props 
// structured props
const MovieCard = ({ movie }) => {
  console.log(movie)
  return (
    <motion.div
      className="movie"
      variants={textVariants}
      initial="initial"
      animate="animate"
    >
      <div>
        <motion.p variants={sliderVariants} initial="initial" animate="animate">
          {movie.Year}
        </motion.p>
      </div>
      <motion.div variants={textVariants} initial="initial" animate="animate">
        {/* checks to make sure there is an image */}
        {/* want to add the light box but is distorted */}
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400"
          }
          alt={movie.Title} /* Use curly braces for dynamic values */
          onClick={() => {}}
        />
      </motion.div>
      <motion.div
      
        initial="initial"
        animate="animate"
        variant={sliderVariants}
      >
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </motion.div>
    </motion.div>
  );
}

export default MovieCard;
