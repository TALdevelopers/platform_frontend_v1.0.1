import  {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Countdown from 'react-countdown';
import api from '../../api/Axios';
import { useNavigate } from 'react-router-dom';


const VERIFY_URL = '/api/verify';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.techanalyticaltd.com/" target={"_blank"}>
          Tech Analytica Limited
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  // Random component
const Completionist = () => <span>Code expired!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};
  

const theme = createTheme();


const VerifyForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
	const [otp, setOTP] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
       
        // const email= data.get('email')
        // const otp= data.get('otp')
        // console.log(email+otp)
        
        const response =  api.post(VERIFY_URL,
          JSON.stringify({ email , otp}),
          {
              headers: { 'Content-Type': 'application/json' },
              'Access-Control-Allow-Credentials': true,             
          }               
      ).then(response => {
        let data = response.data
        // console.log(data);
      
      if(data == '["Invalid OTP"]'){
        alert("wrong OPT")
      }
      else{
        // console.log('first')
        navigate("/login")   
      }})
      };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Verification
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="OTP"
              type="otp"
              id="otp"
              onChange={(e) => setOTP(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
            <Grid container>
              <Grid item xs>
              <Countdown 
                date={Date.now() + 30000}
                renderer={renderer}/>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Resend code"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default VerifyForm