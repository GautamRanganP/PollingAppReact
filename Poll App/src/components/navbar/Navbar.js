
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PollIcon from '@mui/icons-material/Poll'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import Cookies from 'js-cookie'
import { removeUser } from '../feature/UserSlice'

const Navbar = () => {
    const user = useSelector((state) => state.user.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogoutClick = () => {
        handleClose();
        Cookies.remove('token')
        Cookies.remove('user_id')
        dispatch(removeUser())
        const token = Cookies.get('token')
        if (!token) {
          navigate('/')
        }
      };

      const handleProfileRoute = () =>{
        handleClose();
      }

    return (
        <nav className="navbar" style={{ backgroundColor: '#e3f2fd', marginBottom: '10px' }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <PollIcon sx={{ marginRight: '10px', fontSize: '34px' }}></PollIcon>
                    Poll App
                </NavLink>
                <div style={{ display: "flex", alignItems: "center" }}>
                    { user &&
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                {user.email}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleProfileRoute}>Profile</MenuItem>
                                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                            </Menu>
                        </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
