import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { TextField } from '@mui/material'
import Cookies from 'js-cookie'
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
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ height: '125px' }}>
      <Avatar sx = {{ width: 100, height: 100 }}></Avatar>
      </div>
      { user &&
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <TextField disabled id="outlined-basic" label="Username" variant='outlined' defaultValue={user.email} sx={{ margin: '10px' }} ></TextField>
        <TextField disabled id="outlined-basic" label="Firstname" variant='outlined' defaultValue={user.first_name} sx={{ margin: '10px' }} ></TextField>
      </div>
      }
    </div>
  )
}

export default AdminProfile
