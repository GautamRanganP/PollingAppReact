import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import AdminCreate from './components/admin/AdminCreate'
import AdminForm from './components/admin/AdminForm'
import LoginAdmin from './components/admin/LoginAdmin'
import { HomePage } from './pages/HomePage'
import { AdminPage } from './pages/AdminPage'
import Navbar from './components/navbar/Navbar'
import AdminProfile from './components/admin/AdminProfile'
import ErrorPage from './components/error/ErrorPage'
import { Link, Typography } from '@mui/material'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className='main-content'>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>} />
          <Route path='/admin' element={<LoginAdmin></LoginAdmin>}></Route>
          <Route path='/admin/home' element={<AdminPage></AdminPage>}></Route>
          <Route path='/admin/edit/:id' element={<AdminForm></AdminForm>}></Route>
          <Route path='/admin/create' element={<AdminCreate></AdminCreate>}></Route>
          <Route path='/admin/profile' element={<AdminProfile></AdminProfile>}></Route>
          <Route path='*' exact={true} element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
        </div>
        <footer>
          <div className='footer' style={{height:'100%',display:'flex',alignItems:"flex-end",justifyContent:"center"}}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
              {'Copyright © '}
              <Link color="inherit" href="https://mui.com/">
                Company
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>

          </div>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
