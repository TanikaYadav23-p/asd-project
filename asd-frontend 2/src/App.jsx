import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Layout from './layouts/Layout'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup'
import UserAuth from './Auth/UserAuth'
import B2BAuth from './Auth/B2BAuth'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/auth/AdminLogin'
import B2BDashboard from './pages/b2bDashboard/B2BDashboard'
import UserDashboard from './pages/userDashboard/UserDashboard'
import Chatbot from './components/Chatbot'
function App() {

  return (
    <div>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<Signup/>} />
          <Route path='user-auth' element={<UserAuth/>} />
          <Route path='b2b-auth' element={<B2BAuth/>} />
          <Route path='admin-dashboard' element={<AdminDashboard/>} />

          <Route path='admin-login' element={<AdminLogin/>} />

           <Route path='b2b-dashboard' element={<B2BDashboard/>} />
            <Route path='user-dashboard' element={<UserDashboard/>} />
           <Route path='chatbot' element={<Chatbot/>} />
           
          

        </Route>
      </Routes>
    </div>
  )
}

export default App
