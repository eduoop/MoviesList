import axios from "axios";
import React, { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { MovieFromApi } from "../types/MovieFromApi";
import './movieGrid.css'

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {
  const [topMovies, setTopMovies] = useState<MovieFromApi[]>([]);

  const getTopRatedMovies = async (url: string) => {
    const res = await axios.get(url);

    setTopMovies(res.data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesUrl}top_rated?${apiKey}`;

    getTopRatedMovies(topRatedUrl);
  });

  return (
    <div className="container">
      <h2 className="title">Melhores filmes</h2>
      <div className="movies-container">
        {topMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} showLink={true}/>
        ))}
      </div>
    </div>
  );
};
