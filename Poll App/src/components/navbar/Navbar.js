import React, { useCallback, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PollIcon from '@mui/icons-material/Poll'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Cookies from 'js-cookie'
import { removeUser } from '../feature/UserSlice'

const Navbar = () => {
  const user = useSelector((state) => state.user.user)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])
  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])
  const handleLogoutClick = useCallback(() => {
    handleClose()
    Cookies.remove('token')
    Cookies.remove('user_id')
    dispatch(removeUser())
    const token = Cookies.get('token')
    if (!token) {
      navigate('/')
    }
  }, [])

  const handleProfileRoute = useCallback(() => {
    handleClose()
    navigate('/admin/profile')
  }, [])
  const handleHomeRoute = useCallback(() => {
    handleClose()
    navigate('/admin/home')
  }, [])
  const handlePollHome = useCallback(() => {
    handleClose()
    navigate('/')
  }, [])

  // const handleRoute = useCallback((type) => {
  //   handleClose()
  //   switch (type) {
  //     case 'admin':
  //       navigate('/admin/home')
  //       break
  //     case 'participant':
  //       navigate('/')
  //       break
  //     case 'profile':
  //       navigate('/admin/profile')
  //       break
  //     case 'logout':{
  //       Cookies.remove('token')
  //       Cookies.remove('user_id')
  //       dispatch(removeUser())
  //       const token = Cookies.get('token')
  //       if (!token) {
  //         navigate('/')
  //       }
  //     }
  //       break
  //     default:
  //   }
  // }, [])

  return (
        <nav className="navbar" style={{ backgroundColor: '#e3f2fd', marginBottom: '10px' }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <PollIcon sx={{ marginRight: '10px', fontSize: '34px' }}></PollIcon>
                    Poll App
                </NavLink>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    { user &&
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                              <Avatar>{user.email.slice(0, 1)}</Avatar>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  'aria-labelledby': 'basic-button'
                                }}
                            >
                                <MenuItem onClick={handleHomeRoute} selected={location.pathname === '/admin/home' }>A Home</MenuItem>
                                <MenuItem onClick={handlePollHome} selected={location.pathname === '/' }>P Home</MenuItem>
                                <MenuItem onClick={handleProfileRoute} selected={location.pathname === '/admin/profile' }>Profile</MenuItem>
                                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                                {/* <MenuItem onClick={handleRoute('admin')} selected={location.pathname === '/admin/home' }>A Home</MenuItem>
                                <MenuItem onClick={handleRoute('participant')} selected={location.pathname === '/' }>P Home</MenuItem>
                                <MenuItem onClick={handleRoute('profile')} selected={location.pathname === '/admin/profile' }>Profile</MenuItem>
                                <MenuItem onClick={handleRoute('logout')}>Logout</MenuItem> */}
                            </Menu>
                        </div>}
                </div>
            </div>
        </nav>
  )
}

export default Navbar
