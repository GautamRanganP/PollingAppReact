import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from '../progess/ProgressBar'
import PollIcon from '@mui/icons-material/Poll'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import TimerIcon from '@mui/icons-material/Timer'
import Popover from '@mui/material/Popover'
import './card.scss'
import { Typography } from '@mui/material'

const PollCard = (props) => {
  const [option, setOption] = useState('')
  const [percentone, setPercentOne] = useState(0)
  const [percenttwo, setPercentTwo] = useState(0)
  const [ispollalreadyselected, setIsPollAlreadySelected] = useState(false)
  const [daysleft, setDaysLeft] = useState('')
  const user = useSelector((state) => {
    if (state.user && state.user.user) return state.user.user
  })
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

  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const handlePopoverOpen1 = (event) => {
    setAnchorEl1(event.currentTarget)
  }
  const handlePopoverClose1 = () => {
    setAnchorEl1(null)
  }
  const open1 = Boolean(anchorEl1)

  const [anchorEl2, setAnchorEl2] = React.useState(null)
  const handlePopoverOpen2 = (event) => {
    setAnchorEl2(event.currentTarget)
  }
  const handlePopoverClose2 = () => {
    setAnchorEl2(null)
  }
  const open2 = Boolean(anchorEl2)

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

  function setVoteId (id, option) {
    if (localStorage.getItem('poll_id')) {
      const storedIDsJSON = localStorage.getItem('poll_id')
      let storedIDsArray = []
      if (storedIDsJSON) {
        storedIDsArray = JSON.parse(storedIDsJSON)
      }
      storedIDsArray.push({ id, option })
      // storedIDsArray.push(id)
      const updatedIDsJSON = JSON.stringify(storedIDsArray)
      localStorage.setItem('poll_id', updatedIDsJSON)
    } else {
      const initialArray = []
      initialArray.push({ id, option })
      // initialArray.push(id)
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
      const isIDPresent = storedIDsArray.find(poll => poll.id === _id)
      // const isIDPresent = storedIDsArray.includes(_id)
      if (isIDPresent) {
        setIsPollAlreadySelected(true)
        setOption(isIDPresent.option)
      } else {
        setIsPollAlreadySelected(false)
      }
    }
  }

  const handlerOptionOne = (e) => {
    let count = optiononevote
    count++
    props.onEvent1(_id, count, votes)
    setOption(optionone)
    setIsPollAlreadySelected(true)
    setVoteId(_id, optionone)
  }

  const handlerOptionTwo = () => {
    let count = optiontwovote
    count++
    props.onEvent2(_id, count, votes)
    setOption(optiontwo)
    setIsPollAlreadySelected(true)
    setVoteId(_id, optiontwo)
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        { !ispollalreadyselected && daysleft >= 1 && !user
          ? (<div className="d-flex gap-4 options-button-wrap">
            <button
              className="btn btn-primary "
              value={optionone}
              type="button"
              onClick={handlerOptionOne}
            >
              {optionone}
            </button>
            <button
              className="btn btn-primary"
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
            <div
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen1}
              onMouseLeave={handlePopoverClose1}
            >
              {/* <div data-bs-toggle="popover" title={optionone}> */}
              <ProgressBar data={percentone} votedoption = {option} option = {optionone} ></ProgressBar>
            </div>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none'
              }}
              open={open1}
              anchorEl={anchorEl1}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              onClose={handlePopoverClose1}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>{optionone}</Typography>
            </Popover>
            <div
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen2}
              onMouseLeave={handlePopoverClose2}
            >
              <ProgressBar data={percenttwo} votedoption = {option} option = {optiontwo} ></ProgressBar>
            </div>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none'
              }}
              open={open2}
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              onClose={handlePopoverClose2}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>{optiontwo}</Typography>
            </Popover>
          </div>
            )}
        <div className="votes-wrap d-flex justify-content-end">
          {ispollalreadyselected && !user
            ? (
            <span className="already-voted-text">
              <CheckCircleOutlineIcon className="icon-tick" /> Already voted</span>
              )
            : (
            <span></span>
              )}
          <span className="total-votes-text">
            <PollIcon className="icon-poll" />
            <span>Total votes : {votes}</span>
          </span>
          {daysleft >= 1
            ? (
            <span className="days-left-text">
              <TimerIcon className="icon-days" />
              <span>Days left : {daysleft}</span>
            </span>
              )
            : (
            <span className="poll-expired-text">
              <HighlightOffIcon className="icon-expired" />
              Poll expired
            </span>
              )}
        </div>
      </div>
    </div>
  )
}

export default PollCard
