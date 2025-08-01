import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'

const FeaturedSection = () => {
    const navigate = useNavigate()

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden' >
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                
                <p className='text-gray-300 font-medium text-lg'> Now Showing</p>

                <button onClick={() => navigate('/movies')} className='group flex items-center gap-2 text-gray-300 cursor-pointer'>View All
                    <BlurCircle top='0' right='0' />
                    <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
                </button>
            </div>
            <div className='flex flex-wrap max-sm:justify-center gap-8 mt-5'>
                {dummyShowsData.slice(0, 4).map((show) => (
                    <MovieCard className="bg-[#1a1a1a] rounded-3xl p-6" key={show.id} movie={show}  />
                ))}

            </div>
            <div className='flex justify-center mt-20'>
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
                    Show More
                </button>

            </div>
        </div>
    )
}

export default FeaturedSection