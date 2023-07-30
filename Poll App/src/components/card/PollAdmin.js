import { useNavigate } from 'react-router-dom'
import React, { useCallback } from 'react'
import Cookies from 'js-cookie'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

const PollAdmin = (props) => {
  // const classes = useStyles()
  const { title, description, _id, votes, optiononevote, optiontwovote, startdate, enddate, optionone, optiontwo } = props.data
  const navigate = useNavigate()
  const handlerNavigation = () => {
    navigate(`/admin/edit/${_id}`)
  }

  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState('')

  const handleClickOpen = (buttonType) => {
    setOpen(true)
    setType(buttonType)
  }

  const handleClose = useCallback((choice) => {
    setOpen(false)
    if (choice === 'yes') {
      if (type === 'delete') { handleDelete() }
      if (type === 'reset') { handleReset() }
    }
  }, [])

  function handleDelete () {
    const token = Cookies.get('token')
    fetch(`http://localhost:8082/deletepoll/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }).then((response) => {
    }).catch((error) => {
      console.error('Error:', error)
    })
  }

  function handleReset () {
    const token = Cookies.get('token')
    fetch(`http://localhost:8082/reset/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }).then((data) => {
    }).catch((error) => {
      console.error('Error:', error)
    })
  }

  return (
    <div>
        <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure want to {type} ?
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you Sure Want to Reset ?
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={useCallback(() => { handleClose('yes') }, [])}> Yes </Button>
          <Button onClick={useCallback(() => { handleClose('no') }, [])} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>

            <div className="card admin-card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <div className="votes-wrap">
                        <span style={{ fontSize: '14px', color: 'gray' }}>{optionone} : <span>{optiononevote}</span></span>
                        <span style={{ fontSize: '14px', color: 'gray' }}>{optiontwo} : <span>{optiontwovote}</span></span>
                        <span style={{ fontSize: '14px', color: 'gray' }}>Total Votes: <span>{votes}</span></span>
                        <span style={{ fontSize: '14px', color: 'gray' }}>Start Date: <span>{startdate}</span></span>
                        <span style={{ fontSize: '14px', color: 'gray' }}>End Date: <span>{enddate}</span></span>
                    </div>
                    <div className="btn-poll-wrap">
                        <button className="btn btn-primary" style={{ flex: '1' }} type="button" onClick = {handlerNavigation}>Edit</button>
                        <button className="btn btn-danger" style={{ flex: '1' }} type="button" onClick ={() => { handleClickOpen('delete') }}>Delete</button>
                        <button className="btn btn-success" style={{ flex: '1' }} type="button" onClick ={() => { handleClickOpen('reset') }}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PollAdmin
