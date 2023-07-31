import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ProgressBar from '../progess/ProgressBar'

const PollCard = (props) => {
  const [percentone, setPercentOne] = useState(0)
  const [percenttwo, setPercentTwo] = useState(0)
  const [ispollalreadyselected, setIsPollAlreadySelected] = useState(false)
  const [daysleft, setDaysLeft] = useState('')
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
    checkVoted();
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

  function setVoteId(id) {
    if (localStorage.getItem('poll_id')) {
      const storedIDsJSON = localStorage.getItem('poll_id');
      let storedIDsArray = [];
      if (storedIDsJSON) {
        storedIDsArray = JSON.parse(storedIDsJSON);
      }
      storedIDsArray.push(id);
      const updatedIDsJSON = JSON.stringify(storedIDsArray);
      localStorage.setItem('poll_id', updatedIDsJSON)
    }
    else {
      const initialArray = [];
      initialArray.push(id);
      const updatedIDsJSON = JSON.stringify(initialArray);
      localStorage.setItem('poll_id', updatedIDsJSON)
    }
  }
  function checkVoted() {
    if (localStorage.getItem('poll_id')) {
      const storedIDsJSON = localStorage.getItem('poll_id');
      let storedIDsArray = [];
      if (storedIDsJSON) {
        storedIDsArray = JSON.parse(storedIDsJSON);
      }
      const isIDPresent = storedIDsArray.includes(_id);
      if(isIDPresent){
        setIsPollAlreadySelected(true)
      }
      else{
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
    <div className="card" style={{ border: '5px solid rgb(227, 242, 253)' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {!ispollalreadyselected && daysleft >= 1
          ? (
            <div className="d-flex gap-4">
              <button
                className="btn btn-primary "
                style={{ flex: '1', fontWeight: '700' }}
                value={optionone}
                type="button"
                onClick={handlerOptionOne}
              >
                {optionone}
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: '1', fontWeight: '700' }}
                value={optiontwo}
                type="button"
                onClick={handlerOptionTwo}
              >
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
        <div className="votes-wrap d-flex justify-content-end" style={{ flexWrap: 'wrap' }}>
          {ispollalreadyselected
            ? <span
              style={{
                backgroundColor: 'green',
                borderRadius: '5px',
                color: 'white',
                fontWeight: '600',
                marginBottom: '0px',
                padding: '5px 10px'
              }}
            >
              Already voted
            </span>
            : <span></span>
          }
          <span
            style={{
              fontSize: '14px',
              color: 'gray',
              margin: '10px',
              marginBottom: '0px'
            }}
          >
            Total votes: <span>{votes}</span>
          </span>
          {daysleft >= 1
            ? (
              <span
                style={{
                  fontSize: '14px',
                  color: 'gray',
                  margin: '10px',
                  marginBottom: '0px'
                }}
              >
                Days left: <span>{daysleft}</span>
              </span>
            )
            : (
              <span
                style={{
                  fontSize: '14px',
                  color: 'gray',
                  margin: '10px',
                  marginBottom: '0px'
                }}
              >
                Poll expired
              </span>
            )}
        </div>
      </div>
    </div>
  )
}

export default PollCard
