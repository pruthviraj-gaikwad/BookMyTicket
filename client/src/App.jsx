import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import AddShow from './pages/admin/AddShows'
import Dashboard from './pages/admin/Dashboard'
import ListBookings from './pages/admin/ListBookings'
import ListShows from './pages/admin/ListShows'
import Layout from './pages/admin/Layout'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
// import { Layout } from 'lucide-react'


const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShow />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>

      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}
export default App

