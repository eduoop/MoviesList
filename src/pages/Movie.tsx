import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill} from 'react-icons/bs'
import {BiTimeFive} from 'react-icons/bi'
import {BsArrowLeftCircleFill} from 'react-icons/bs'
import {HiOutlinePencil} from 'react-icons/hi'
import './movie.css'
import { MovieCard } from '../components/MovieCard'
import { MovieApiFullInfos } from "../types/MovieFromApi";
import axios from 'axios'

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {

  const {id} = useParams()
  const [movie, setMovie] = useState<MovieApiFullInfos>()
  const navigate = useNavigate()

  const getMovie = async (url: string) => {
    const res = await axios.get(url);
    setMovie(res.data);
    console.log(res.data)
  };

  const formatCurrency = (num: number) => {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`
    getMovie(movieUrl)
  }, [])

  return (
    <div className='movie-page'>
      <BsArrowLeftCircleFill className='back-arrow' onClick={() => navigate(-1)}/>
      { movie &&
       <div className='cardFlex'>
           <MovieCard movie={movie} showLink={false}/>
           <div className='infos'>
           <p className='tagline'>{movie.tagline}</p>
            <div className='info'>
              <h3>
                <BsWallet2/> Orçamento:
              </h3>
              <p>{formatCurrency(movie.budget)}</p>
            </div>
            <div className='info'>
              <h3>
                <BsGraphUp/> Receita:
              </h3>
              <p>{formatCurrency(movie.revenue)}</p>
            </div>
            <div className='info'>
              <h3>
                <BiTimeFive/> Duração:
              </h3>
              <p>{movie.runtime} minutos</p>
            </div>
            <div className='info description'>
              <h3>
                <HiOutlinePencil/> Descrição:
              </h3>
              <p>{movie.overview}</p>
            </div>
           </div>
       </div>
      }
    </div>
  )
}
