import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    return (
        <div className='flex items-center justify-between px-6 md:px-10 h-30 border-b border-gray-300/30'>
            <Link to="/">
                <img className="cursor-pointer hover:scale-105 transition-transform duration-200 h-20"
                    src={assets.logo}
                    alt="logo" />
            </Link>
        </div>
    )
}

export default AdminNavbar