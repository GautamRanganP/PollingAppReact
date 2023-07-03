import React, { useEffect, useState } from 'react'
import PollCard from '../components/card/PollCard'

export function HomePage () {
  const [data, setData] = useState([])

  function handleOptionOne (id, count, total) {
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
  }

  function handleOptionTwo (id, count, total) {
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
  }

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
      setData(response)
    })
    newSocket.addEventListener('close', (event) => {
      console.log('connection close')
    })
  }, [])

  return (
        <div className="content-poll">
            { data.length > 0
              ? <div className="row poll-card-margin" style={{ margin: '10px' }}>
                    { data.map((poll) => {
                      return (
                          <div className="col-sm-6 mb-4" key={poll._id}>
                                    <PollCard data={poll} isPollSelect={{ isPollSelect: false }} onEvent1={handleOptionOne} onEvent2={handleOptionTwo}></PollCard>
                          </div>
                      )
                    })
                    }
                </div>
              : <div style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '40px' }}>No poll Available</div>
            }
        </div>
  )
}
