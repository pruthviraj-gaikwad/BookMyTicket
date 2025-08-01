import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
    const navigate = useNavigate();
    const [selected , setSelected] = useState(null)

    const onBookHandler = ()=>{
        if(!selected){
            return toast('Please select a date')
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0)
    }
    return (
        <div id='dateSelect' className='pt-30'>
            <div className='relative flex flex-col md:flex-row gap-10 p-8 
                            bg-white/5 border border-white/20 
                            rounded-2xl backdrop-blur-md shadow-lg'>

                <BlurCircle top="-100px" left="-100px" />
                <BlurCircle top="100px" right="0px" />

                <div className='flex-1'>
                    <p className='text-lg font-semibold'>Choose Date</p>
                    <div className='flex items-center gap-6 text-sm mt-5'>
                        <ChevronLeftIcon width={28} />
                        <div className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
                            {Object.keys(dateTime).map((date) => (
                                <button
                                    onClick={()=>setSelected(date)}
                                    key={date}
                                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer hover:bg-primary/20 transition ${selected===date ? "bg-red-400 text-white": "border border-red-200/50"}`}>
                                    <span>{new Date(date).getDate()}</span>
                                    <span>{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                </button>
                            ))}
                        </div>
                        <ChevronRightIcon width={28} />
                    </div>
                </div>

                <div className='flex items-center md:items-start justify-center md:justify-start md:pt-14 '>
                    <button type="button"
                        onMouseEnter={(e) =>
                            e.currentTarget.style.backgroundColor = 'var(--color-primary-dull)'
                        }
                        onMouseLeave={(e) =>
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                        }
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white'
                        }} className='bg-primary text-white px-8 py-3 rounded hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer w-full max-w-fit text-center'
                        onClick={onBookHandler}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DateSelect
