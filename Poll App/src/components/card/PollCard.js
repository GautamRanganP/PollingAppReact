import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from '../progess/ProgressBar'
import './card.scss'

const PollCard = (props) => {
  const [percentone, setPercentOne] = useState(0)
  const [percenttwo, setPercentTwo] = useState(0)
  const [ispollalreadyselected, setIsPollAlreadySelected] = useState(false)
  const [daysleft, setDaysLeft] = useState('')
  const user = useSelector((state) => { if (state.user && state.user.user) return state.user.user })
  const {
    _id,
    title,
    description,
    optionone,
    optiontwo,
    votes,
    optiononevote,
    optiontwovote,
    startdate,
    enddate
  } = props.data

  useEffect(() => {
    if (votes !== 0) {
      let percent = (optiononevote / votes) * 100
      percent = Math.round(percent)
      setPercentOne(percent)
    } else {
      setPercentOne(0)
    }
  }, [optiononevote, votes])

  useEffect(() => {
    if (votes !== 0) {
      let percent = (optiontwovote / votes) * 100
      percent = Math.round(percent)
      setPercentTwo(percent)
    } else {
      setPercentTwo(0)
    }
  }, [optiontwovote, votes])

  useEffect(() => {
    checkVoted()
    const today = moment().format('YYYY/MM/DD').toString()
    const todayFormat = moment().format('DD/MM/YYYY').toString()
    const end = moment(enddate, 'DD/MM/YYYY').format('YYYY/MM/DD').toString()
    const start = moment(enddate, 'DD/MM/YYYY').format('YYYY/MM/DD').toString()
    if (moment(end).isSameOrAfter(today)) {
      let startingdate = ''
      if (moment(start).isAfter(today)) startingdate = todayFormat
      else startingdate = startdate
      const a = moment(enddate, 'DD/MM/YYYY')
      const b = moment(startingdate, 'DD/MM/YYYY')
      const daysAvailable = a.diff(b, 'days')
      // handling 0 days
      if (daysAvailable === 0) {
        setDaysLeft(1)
      } else {
        setDaysLeft(daysAvailable)
      }
      console.log('date left:', daysAvailable)
    } else {
      setDaysLeft(-1)
    }
  }, [startdate, enddate])

  function setVoteId (id) {
    if (localStorage.getItem('poll_id')) {
      const storedIDsJSON = localStorage.getItem('poll_id')
      let storedIDsArray = []
      if (storedIDsJSON) {
        storedIDsArray = JSON.parse(storedIDsJSON)
      }
      storedIDsArray.push(id)
      const updatedIDsJSON = JSON.stringify(storedIDsArray)
      localStorage.setItem('poll_id', updatedIDsJSON)
    } else {
      const initialArray = []
      initialArray.push(id)
      const updatedIDsJSON = JSON.stringify(initialArray)
      localStorage.setItem('poll_id', updatedIDsJSON)
    }
  }
  function checkVoted () {
    if (localStorage.getItem('poll_id')) {
      const storedIDsJSON = localStorage.getItem('poll_id')
      let storedIDsArray = []
      if (storedIDsJSON) {
        storedIDsArray = JSON.parse(storedIDsJSON)
      }
      const isIDPresent = storedIDsArray.includes(_id)
      if (isIDPresent) {
        setIsPollAlreadySelected(true)
      } else {
        setIsPollAlreadySelected(false)
      }
    }
  }

  const handlerOptionOne = (e) => {
    let count = optiononevote
    count++
    props.onEvent1(_id, count, votes)
    setIsPollAlreadySelected(true)
    setVoteId(_id)
  }

  const handlerOptionTwo = () => {
    let count = optiontwovote
    count++
    props.onEvent2(_id, count, votes)
    setIsPollAlreadySelected(true)
    setVoteId(_id)
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {!ispollalreadyselected && daysleft >= 1 && !user
          ? (
            <div className="d-flex gap-4 options-button-wrap">
              <button className="btn btn-primary " value={optionone} type="button" onClick={handlerOptionOne}>
                {optionone}
              </button>
              <button className="btn btn-primary" value={optiontwo} type="button" onClick={handlerOptionTwo}>
                {optiontwo}
              </button>
            </div>
            )
          : (
            <div>
              <ProgressBar data={percentone}></ProgressBar>
              <ProgressBar data={percenttwo}></ProgressBar>
            </div>
            )}
        <div className="votes-wrap d-flex justify-content-end">
          {ispollalreadyselected && !user
            ? <span className='already-voted-text'> Already voted </span>
            : <span></span>
          }
          <span className='total-votes-text'>Total votes: <span>{votes}</span></span>
          {daysleft >= 1
            ? (<span className='days-left-text'>Days left: <span>{daysleft}</span></span>)
            : (<span className='poll-expired-text'>Poll expired</span>)}
        </div>
      </div>
    </div>
  )
}

export default PollCard
