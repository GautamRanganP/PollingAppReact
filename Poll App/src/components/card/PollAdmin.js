import { useNavigate } from 'react-router-dom'
import React from 'react'
import Cookies from 'js-cookie'

const PollAdmin = (props) => {
  const { title, description, _id, votes, optiononevote, optiontwovote, startdate, enddate, optionone, optiontwo } = props.data
  const navigate = useNavigate()
  const handlerNavigation = () => {
    navigate(`/admin/edit/${_id}`)
  }

  function handleDelete () {
    const token = Cookies.get('token')
    fetch(`http://localhost:8080/deletepoll/${_id}`, {
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
    fetch(`http://localhost:8080/reset/${_id}`, {
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
                        <button className="btn btn-danger" style={{ flex: '1' }} type="button" onClick ={handleDelete}>Delete</button>
                        <button className="btn btn-success" style={{ flex: '1' }} type="button" onClick ={handleReset}>Reset Vote</button>
                    </div>
                </div>
            </div>
  )
}

export default PollAdmin
