import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Error = () => {
  return (
    <Box sx={{ height:'80vh',
    display:'flex', 
    flexDirection:'column',
    justifyContent:"center",
    alignItems:'center' }}>
      <Typography variant='h1'
                  color={"var(--primaryColor)"}
      >404</Typography>
      <Typography variant='h4'
                  color={"var(--secondaryColor)"}
      >Page not found</Typography>
    </Box>
  )
}

export default Error