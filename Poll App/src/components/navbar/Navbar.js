import React, { useCallback, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GitHubIcon from '@mui/icons-material/GitHub'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import GroupIcon from '@mui/icons-material/Group'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Cookies from 'js-cookie'
import { removeUser } from '../feature/UserSlice'
import './Navbar.scss'

const Navbar = () => {
  const user = useSelector((state) => { if (state.user && state.user.user) return state.user.user })
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
    localStorage.removeItem('token')
    Cookies.remove('token')
    Cookies.remove('user_id')
    dispatch(removeUser())
    const token = Cookies.get('token')
    if (!token) {
      navigate('/admin')
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

  return (
        <nav className="navbar">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <GitHubIcon className="brand-logo"/>
                    Poll App
                </NavLink>
                <div className="admin-avatar">
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
                                <MenuItem onClick={handleHomeRoute} selected={location.pathname === '/admin/home' }><AdminPanelSettingsIcon sx={{ marginRight: '5px' }}/> Admin Home</MenuItem>
                                <MenuItem onClick={handlePollHome} selected={location.pathname === '/' }><GroupIcon sx={{ marginRight: '5px' }}/> Participant Home</MenuItem>
                                <MenuItem onClick={handleProfileRoute} selected={location.pathname === '/admin/profile' }><AccountCircleIcon sx={{ marginRight: '5px' }}/> Profile</MenuItem>
                                <MenuItem onClick={handleLogoutClick}><LogoutIcon sx={{ marginRight: '5px' }}/> Logout</MenuItem>
                            </Menu>
                        </div>}
                </div>
            </div>
        </nav>
  )
}

export default Navbar
