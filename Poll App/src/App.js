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

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>} />
          <Route path='/admin' element={<LoginAdmin></LoginAdmin>}></Route>
          <Route path='/admin/home' element={<AdminPage></AdminPage>}></Route>
          <Route path='/admin/edit/:id' element={<AdminForm></AdminForm>}></Route>
          <Route path='/admin/create' element={<AdminCreate></AdminCreate>}></Route>
        </Routes>
      </BrowserRouter>
     </div>
  )
}

export default App
