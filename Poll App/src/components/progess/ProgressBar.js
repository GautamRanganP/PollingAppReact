import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import DoneIcon from '@mui/icons-material/Done'
import './ProgressBar.scss'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
  }
}))

export default function ProgressBar (props) {
  return (
    <Box className = {`progress-wrap ${props.votedoption === props.option ? 'active-vote' : ''}`}>
      <BorderLinearProgress variant='determinate' value={props.data} />
      <span className='vote-percent-text'>{props.data}%</span>
      { props.votedoption === props.option && <DoneIcon className='progress-done-icon'/>}
    </Box>
  )
}
