import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { TextField } from '@mui/material'
import Cookies from 'js-cookie'
import './admin.scss'
import { useNavigate } from 'react-router-dom'

const AdminProfile = () => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      navigate('/')
    }
  }, [])

  return (
    <div className ='admin-profile-wrap'>
      <div className ='admin-profile-avatar'>
      <Avatar className='avatar-profile'></Avatar>
      </div>
      { user &&
      <div className='admin-user-input'>
        <TextField disabled id="outlined-basic" label="Username" variant='outlined' defaultValue={user.email} className='user-profile-input'></TextField>
        <TextField disabled id="outlined-basic" label="Firstname" variant='outlined' defaultValue={user.first_name} className='user-profile-input'></TextField>
      </div>
      }
    </div>
  )
}

export default AdminProfile
