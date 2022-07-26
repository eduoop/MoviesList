import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import './navbar.css'

export const Navbar = () => {

  const [search, setSearch] = useState('')

  const navigate = useNavigate();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }

  return (
    <nav id='navbar'>
      <h2>
        <Link to={"/"}> <BiCameraMovie/> MoviesLib</Link>
      </h2>
      <form onSubmit={(e) => submit(e)}>
        <div className='inputAndClose'>
          <input type="text" placeholder='Busque um filme' onChange={(e) => setSearch(e.target.value)} value={search}/>
          { search &&
            <MdClose className='closeIcon' onClick={() => setSearch("")}/>
          }
        </div>
        <button type='submit'>
          <AiOutlineSearch/>
        </button>
      </form>
    </nav>
  )
}

