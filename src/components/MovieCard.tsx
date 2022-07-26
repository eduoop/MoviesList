import React from 'react'
import { Link } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import { MovieFromApi, MovieApiFullInfos } from "../types/MovieFromApi";
import './movieCard.css'

type Props = {
  movie: MovieFromApi | MovieApiFullInfos
  showLink: boolean;
}
const imgUrl = import.meta.env.VITE_IMG


export const MovieCard = ({movie, showLink = true}: Props) => {
  return (
    <div className='movie-card'>
      <img src={imgUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar/> {movie.vote_average}
      </p>
      { showLink &&
        <Link to={`/movie/${movie.id}`}>Detalhes</Link>
      }
    </div>
  )
}
