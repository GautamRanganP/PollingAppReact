import * as React from 'react'
import { AlertTitle, Alert, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage () {
  const navigate = useNavigate()
  return (
    <Box sx={{ width: '600px', margin: '20px auto' }}>
    <Alert severity="error">
      <AlertTitle>Error 404 Page not found</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>
    <Button sx={{ margin: '10px 0px' }} onClick={ React.useCallback(() => navigate('/'), [])} variant='contained'>Go To Home</Button>
    </Box>
  )
}
