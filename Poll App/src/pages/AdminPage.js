import React, { useEffect, useState } from 'react'
import PollAdmin from '../components/card/PollAdmin'
import 'react-datepicker/dist/react-datepicker.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export function AdminPage () {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const handlerLogout = () => {
    Cookies.remove('token')
    const token = Cookies.get('token')
    if (!token) {
      navigate('/')
    }
  }

  const handleRoute = () => {
    navigate('/admin/create')
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      navigate('/admin')
      return
    }
    const newSocket = new WebSocket('ws://localhost:8081/')
    newSocket.addEventListener('open', (event) => {
      console.log('connection opened')
      const json = JSON.stringify({ update: false })
      console.log('sent from client ', json)
      newSocket.send(json)
    })
    newSocket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data)
      const response = JSON.parse(event.data)
      setData(response)
    })
    newSocket.addEventListener('close', (event) => {
      console.log('connection close')
    })
  }, [])

  return (
        <div>
            <div style={{ position: 'absolute', right: '10px', top: '8px' }}>
                <button className="btn btn-primary" onClick={handlerLogout}> Logout</button>
            </div>
            <div className="content-poll">
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-primary" onClick={handleRoute}>Create Poll</button>
                </div>
                {data.length > 0
                  ? <div className="row poll-card-margin">
                        {data.map((poll) => {
                          return (
                                <div className="col-sm-6 mb-5" key={poll._id}>
                                    <PollAdmin data={poll}></PollAdmin>
                                </div>
                          )
                        })}

                    </div>
                  : <div style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '40px' }}>No poll Available</div>
                }
            </div>
        </div>
  )
}
