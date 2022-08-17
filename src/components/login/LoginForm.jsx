import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Icon from '@mui/material/Icon';
import { useState } from 'react';
import api, {login} from '../../api/Axios';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

import "./LoginForm.css";
import LocalStorageService from '../../api/localstorage';


const LOGIN_URL=`/api/oauth/token`

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
  
  const theme = createTheme();

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

  const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/api/google/callback`,
			"_self"
		);
	};
	const facebookAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/api/facebook/callback`,
			"_self"
		);
	};


  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const response =  login(username, password, (response)=>{
      const localStorageService = LocalStorageService.getService();
      localStorageService.setToken(response.data.data);
      console.log(response.data.data);
      if(response.data.data){
        navigate("/")
        console.log("User found!!")
      }else{
      alert("Wrong user credentials")
      }
    })(
     
      
  );
  // const newdata =response.json()
  
 
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
          <Avatar sx={{ m: 2, bgcolor: 'primary.main', p:3 }}>
            <LoginIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
          LOGIN
          </Typography>
          <Grid container className='SocialContainer'
            sx={{ display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'}}
            >
              {/* <Grid item xs >
                <Typography sx={{ textAlign:"center", color:"var(--black)" }} mt={2}>Or sign in with social accounts</Typography>
              </Grid> */}
              <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, display:"flex", flexDirection:"row" }}
              onClick={googleAuth}
            >
              {/* <Link target={"_blank"} style={{display:"flex", flexDirection:"row", alignItems:'center', justifyContent:"center", paddingRight:"10px"}}> */}
                <GoogleIcon className='Icons' style={{color:"white", fontSize:"2rem", margin:"0px 10px"}}/><Typography sx={{ color: "white", fontSize:"1rem" }}>Log in with google</Typography>
                {/* </Link> */}
            </Button>
              <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={facebookAuth}
            >
              <FacebookIcon className='Icons' style={{color:"white", fontSize:"2rem", margin:"0px 10px"}}/><Typography sx={{ color: "white", fontSize:"1rem" }}>Log in with facebook</Typography>
            </Button>
              {/* <Grid className='IconsContainer'>
              <Link href="https://www.google.com/" target={"_blank"}>
                <GoogleIcon className='Icons' 
                sx={{color: 'var(--primaryColor)',
                cursor: 'pointer',
                fontSize: '3rem',
                transition: '.2s ease-in-out',
                '&:hover':{
                  
                    color: 'var(--secondaryColor)'
                
                }}}/></Link>
              <Link href="https://www.facebook.com/" target={"_blank"}>
                <FacebookIcon 
                sx={{color: 'var(--primaryColor)',
                cursor: 'pointer',
                fontSize: '3rem',
                transition: '.2s ease-in-out',
                '&:hover':{            
                  color: 'var(--secondaryColor)'      
              }}} 
                className='Icons'/></Link>
              </Grid> */}
            </Grid>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize:"1rem"  }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
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

export default LoginForm