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
import { useNavigate } from 'react-router-dom';

import {  useRef,useState, useEffect } from "react";
// import axios from '../../api/Axios';
import './Register.css';
import api from "../../api/Axios";



const REGISTRATION_URL = '/api/signup';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
 

// function Copyright(props) {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://www.techanalyticaltd.com/" target={"_blank"}>
//           Tech Analytica Limited
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }
  
  const theme = createTheme();

const RegisterForm = () => {
  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      // userRef.current.focus();
  }, [])

  useEffect(() => {
      // emailRef.current.focus();      
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(username));
  }, [username])

  
  useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(password));
      setValidMatch(password === matchPwd);
  }, [password, matchPwd])

  useEffect(() => {
    setErrMsg('');
}, [username,email, password, matchPwd])

const navigate = useNavigate();
  
const handleSubmit = async (e) => {
  e.preventDefault();
  // if button enabled with JS hack
  const v1 = USER_REGEX.test(username);
  const v2 = PWD_REGEX.test(password);
  const v3 = EMAIL_REGEX.test(email);
  if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
  }
  try {
      // console.log(user, pwd, email)
      const response = await api.post(REGISTRATION_URL,
          JSON.stringify({ username, password , email}),
          {
              headers: { 'Content-Type': 'application/json' },
              'Access-Control-Allow-Credentials': true,
              
          }
      );
      
    
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
    navigate("/registration/verify")

  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
         
      } else if (err.response?.status === 409) {
          setErrMsg('Mail Taken');
          console.log("Username Taken");
      } else{
          setErrMsg('Signup Failed');
          console.log("Signup Failed");
      }
      errRef.current.focus();
  }
}



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
            Sign Up
          </Typography>

      
          <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>         
          <label htmlFor="username">

                            {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
                       </label>
            <TextField
              margin="normal"
              required 
              fullWidth
              id="username  "
              label="User name "
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUser(e.target.value)}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
            />
             <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
              <label htmlFor="email">
                           
                            {/* <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} /> */}
                            
              </label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
             <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            Please provide a valid email<br /></p>
            <label htmlFor="password">
                           
                            {/* <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} /> */}
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password"
              type="password"
              id="password1"
              autoComplete="current-password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
             
            />
             <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
            <label htmlFor="confirm_pwd">
                            
                            {/* <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} /> */}
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="confirm-password"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
            
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
             <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            Must match the first password input field.
                        </p>
                        
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login here"}
                </Link>
                
              </Grid>
            </Grid>
          </Box>
     
        </Box>
        
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      
    </ThemeProvider>
  )
}

export default RegisterForm