import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";

import './Banner.css';
import { Container } from '@mui/material';


const Banner = () => {

  return (
    <Box sx={{ flexGrow: 1}} className='Hero'>
      <Container>
    <Grid container>
    <Grid item xs></Grid>
      <Grid xs={12} md={12} lg={10} xl={7}  item className='HeroSection GridItems'>
          <Grid item>
         
            <Typography variant='h3' sx={{color:"var(--secondaryColor)"}}>Sample Text Here</Typography>
            <Typography variant='h4' sx={{color:"var(--black)"}}>Placeholder Text</Typography>
          
          </Grid>
          <Grid item>
          <Button href='/registration' size="large" variant="contained">Register now</Button>
          </Grid>
        </Grid>
      <Grid item xs></Grid>
      </Grid>
      </Container></Box>
  )
}

export default Banner;