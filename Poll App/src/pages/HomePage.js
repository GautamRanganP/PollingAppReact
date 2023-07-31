import React, { useCallback, useEffect, useState } from 'react'
import PollCard from '../components/card/PollCard'
// import Backdrop from '@mui/material/Backdrop'
// import CircularProgress from '@mui/material/CircularProgress'

export function HomePage () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const handleOptionOne = useCallback((id, count, total) => {
    const newSocket = new WebSocket('ws://localhost:8081/')
    let serverdata = {}
    newSocket.addEventListener('open', (event) => {
      const json = JSON.stringify({ id, countoptionone: count, totalvote: total, update: true })
      console.log('sent', json)
      newSocket.send(json)
    })
    newSocket.addEventListener('message', (event) => {
      console.log('Message from server', event.data)
      serverdata = JSON.parse(event.data)
      setData(serverdata)
    })
  }, [])

  const handleOptionTwo = useCallback((id, count, total) => {
    const newSocket = new WebSocket('ws://localhost:8081/')
    let serverdata = {}
    newSocket.addEventListener('open', (event) => {
      const json = JSON.stringify({ id, countoptiontwo: count, totalvote: total, update: true })
      console.log('sent from client', json)
      newSocket.send(json)
    })
    newSocket.addEventListener('message', (event) => {
      console.log('Message from server', event.data)
      serverdata = JSON.parse(event.data)
      setData(serverdata)
    })
  }, [])

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8081/')
    newSocket.addEventListener('open', (event) => {
      console.log('connection opened')
      const json = JSON.stringify({ update: false })
      console.log('sent from client', json)
      newSocket.send(json)
    })
    newSocket.addEventListener('message', (event) => {
      console.log('Message from server', event.data)
      const response = JSON.parse(event.data)
      setLoading(false)
      setData(response)
    })
    newSocket.addEventListener('close', (event) => {
      console.log('connection close')
    })
  }, [])

  return (
        <div className="content-poll">
            { data.length > 0 && !loading
              && <div className="row poll-card-margin" style={{ margin: '20px' }}>
                    { data.map((poll) => {
                      return (
                          <div className="col-sm-6 mb-4" key={poll._id}>
                                    <PollCard data={poll} isPollSelect={{ isPollSelect: false }} onEvent1={handleOptionOne} onEvent2={handleOptionTwo}></PollCard>
                          </div>
                      )
                    })
                    }
                </div>}
          { !data.length > 0 && !loading &&   <div style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '40px' }}>
                {/* <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!data.length > 0}
          >
            <CircularProgress color="inherit" />
          </Backdrop> */}
               No poll Available
              </div>
}

            { loading && <div className="d-flex justify-content-center mt-4">
                          <div className="spinner-border" role="status">
                          </div>
                        </div>
            }
        </div>
  )
}
