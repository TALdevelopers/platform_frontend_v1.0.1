import React from 'react'
import { Box } from '@mui/system'
import { Container, Grid, Typography } from '@mui/material'

const container = {
    color:'var(--white)',
    marginTop:'10px',
    textAlign:'center'
}
const box = {
    backgroundColor: 'var(--primaryColor)',
    padding:'10px 0px'
}

const Footer = () => {
  return (
    <Box maxWidth={"100%"} sx={box}>
        <Container maxWidth={'xl'} sx={container}>
            <Grid container>
                <Grid item xs={12} sm={3} textAlign>
                    <Typography variant='h5'>One</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant='h5'>Two</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant='h5'>Three</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant='h5'>Four</Typography>
                    <Typography>Hello</Typography>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default Footer