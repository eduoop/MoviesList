import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MovieFromApi } from '../types/MovieFromApi'
import './movieGrid.css'
import { MovieCard } from '../components/MovieCard'
import axios from 'axios'

const searchUrl = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

export const Search = () => {

  const [params] = useSearchParams()

  const [movies, setMovies] = useState<MovieFromApi[]>()
  const query = params.get("q");

  const getSearchedMovies = async (url: string) => {
    axios.get(url).then((res) => {
      console.log(res.data.results)
      setMovies(res.data.results)
    })
  }

  useEffect(() => {
    const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`

    getSearchedMovies(searchWithQueryUrl)
  }, [query])

  return (
    <div className="container">
      <h2 className="title">Resultados para: <span className='query-text'>{query}</span></h2>
      <div className="movies-container">
        {movies?.map((movie, index) => (
          <MovieCard key={index} movie={movie} showLink={true}/>
        ))}
      </div>
    </div>
  )
}
