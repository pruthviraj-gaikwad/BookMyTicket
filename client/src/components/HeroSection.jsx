import React from 'react'
import { assets } from '../assets/assets'
import { CalendarIcon, ClockIcon, ArrowRight } from 'lucide-react'
import backgroundImage from '../assets/backgroundImage.png'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-screen text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} >

      <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20' />

      <h1 className='text-5x1 md:text-[70px] md:leading-8 font-semibold max-w-110'> Guardians<br /></h1>
      <h1 className='text-5x1 md:text-[70px] md:leading-18 font-semibold max-w-110'>of the Galaxy</h1>

      <div className='flex items-center gap-4 text-gray-300'>
        <span>
          Action | Adventure | Sci-Fi
        </span>
        <div className='flex items-center gap-1'>
          <CalendarIcon className='w-4.5 h-4.5' />
          <span>2018</span>
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='w-4.5 h-4.5' />
          <span>2h 8m</span>
        </div>

      </div>
      <p className='max-w-md text-gray-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
      <button
        onClick={() => navigate('/movies')}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
        className='flex items-center gap-1 px-6 py-3 text-sm transition rounded-full font-medium cursor-pointer'
      >
        Explore Movies
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export default HeroSection