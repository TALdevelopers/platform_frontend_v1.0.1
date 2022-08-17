import React, { useEffect, useState } from 'react';
// import Course from '../components/course/Course';
import coursesData from "../data/coursesData";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';



// import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { CssBaseline } from '@mui/material';
import {  CardActionArea } from '@mui/material';
import ReactPlayer from 'react-player';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const CardGridStyle = styled(Card)(({ theme }) => ({
  // padding: "5px",
  margin:"5px"
    // paddingRight: "5px"
}));

const CardMediaStyle = styled(CardMedia)(({ theme }) => ({
     width: "105%"
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Courses = () => {
  // const [courses, setCourses]=useState([])
  
  //   useEffect(()=>{
  //       // fetch('https://www.boredapi.com/api/activity')
  //       fetch('./coursesData.json')
  //       .then(res=>res.json())
  //       .then(data=>console.log(data)
        
  //       )
  //         // console.log(courses)
       
  //   },[])

  const textstyle = {
    textDecoration: "none"
  };

  return (
   <>
   <CssBaseline/>
        <Box
        sx={{ flexGrow: 1,
          justifyContent:"center",
          alignItems:"center",
        
          mx: '20%'
         }} 
       >
        <Search sx={{ marginTop: "15px", marginBottom: "15px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <Typography>Showing All courses results</Typography>
        <Grid spacing={4}>
        <Grid 
        container 
        columns={{ xs: 12, sm: 12, md: 10, lg: 10 }}
        // xl={10} lg={12} md={'auto'} sm={8}
        justifyContent="center"

        >  
       {
        coursesData.map(course=>{   
          return(<div key={course.title}>
            {/* {course.title} */}
            {/* <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="250"
        image={course.image}
        alt="Thumbnail"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
         ${course.price}
         </Typography>
      </CardContent>
      <CardActions>
      <Link to={`/course-details?course=${course.id}`}  style={textstyle}><Button size="small">Course Details</Button></Link>
        
      </CardActions>
    </Card> */}
<CardGridStyle>
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMediaStyle>
          <CardMedia
          component="img"
          height="140"
          
          image={course.image}
          alt="green iguana"
        />
        
        </CardMediaStyle>
        <CardContent>
          <Typography variant="h5" component="div">
          {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${course.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions>
      <Link to={`/course-details?course=${course.id}`}  style={textstyle}><Button size="small">Course Details</Button></Link>
        
      </CardActions>
     
    </Card>
    </CardGridStyle>
          </div>)
        })
       }
     
     
       </Grid>
       </Grid>
       </Box>
       </>
       
  )
}

export default Courses