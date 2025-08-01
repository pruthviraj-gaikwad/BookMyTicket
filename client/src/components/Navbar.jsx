import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      <Link to='/' className='text-2xl font-bold text-white'>
        <img src={assets.logo} alt='' className='w-36 h-auto' />
      </Link>

      <div className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:h-screen max-md:w-full max-md:bg-black/70 z-40 flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:px-8 py-3 md:rounded-full md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden md:flex'}`}>
        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setIsOpen(false)} />

        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/' className='hover:text-primary transition'>Home</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/movies' className='hover:text-primary transition'>Movies</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/' className='hover:text-primary transition'>Theaters</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/' className='hover:text-primary transition'>Releases</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/favorite' className='hover:text-primary transition'>Favorites</Link>
      </div>
      {/* <div className='flex items-center gap-6'>
        <SearchIcon className='max-md:hidden w-5 h-5 cursor-pointer' />
        {
          !user ? (
            <button onClick={openSignIn} className='px-5 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 transition rounded-full font-medium text-white cursor-pointer'>
              Login
            </button>
          ) : (
            <UserButton></UserButton>
          )
        }
      </div> */}

      <div className='flex items-center gap-6'>

        <SearchIcon className='max-md:hidden w-5 h-5 cursor-pointer text-white' />


        {user && (
          <button
            onClick={() => navigate('/my-bookings')}
            className='flex items-center gap-2 text-white hover:text-primary transition text-sm font-medium cursor-pointer'
          >

            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2h2l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z" />
            </svg>
            My Bookings
          </button>
        )}


        {!user ? (
          <button
            onClick={openSignIn}
            className='px-5 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 transition rounded-full font-medium text-white cursor-pointer'
          >
            Login
          </button>
        ) : (
          <UserButton />
        )}
      </div>


      <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={() => setIsOpen(true)} />
    </div>
  )
}

export default Navbar

