import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import coursesData from "../data/coursesData";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import ReactPlayer from "react-player";
import api from '../api/Axios';
import { blue } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import { useParams } from 'react-router';


const VIDEOLOG_URL = '/videologdata';

const VideoGridWrapper = styled(Grid)(({ theme }) => ({
     marginTop:"30%"     
}));

const vdoPlayerStyle = styled("div")(({ theme }) => ({
  width: "70%",
  height: "70%",
}));

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        // border: '1px solid',
        // borderColor: (theme) =>
        //   theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};


const CoursesDetails = (props) => {
  let dataArray = window.location.href.split("course=");
  let courseId=dataArray[1];
  console.log(courseId);

  let course = coursesData.find((obj)=>{return obj.id===courseId});
  console.log(course) 

  const [played, setPlayed] = useState(0);
  
console.log(course.title)

  // useEffect(()=>{
  //   fetch(`https:apilink/singleCourse/${id}`)
  //   .then(res=>res.json())
  //   // .then(data=>setSingleCourse(data))
  //   .then(data=>setSingleCourse(data))
    
// },[])
  return (
    <div>
    {/* <div><h1>CoursesDetails</h1></div> */}
    <div style={{ width: '100%' }}>
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Grid container paddingLeft={"10%"}>
        <Grid item lg={6} md={6} sm={12}>
         <h1>Course Details</h1>
         {/* <h1>C Programming for Beginners</h1> */}
         <br/>
         <br/>
         <Card sx={{ maxWidth: 375, backgroundColor: "#2196f3", color: "white" }}>
         <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{justifyContent:"center"}}>
          <h4>{course.title}</h4>
          
        </Typography>
        
        <Typography sx={{display:"flex"}}>
        <AccessTimeIcon></AccessTimeIcon>
        128 hours
        </Typography>
        <Typography variant="body2" color="white" >
         <h3>$2550</h3>
         </Typography>
         <Link to="/course" style={{textDecoration:'none'}}><Button variant="contained" color="primary"><Typography variant="p" color="white" >Start now</Typography></Button></Link>
      </CardContent>
         </Card>
         <h3>{course.description_title1}</h3>
         <p>{course.description_details1}</p>
         <h3>{course.description_title1}</h3>
         <p>{course.description_details1}</p>
         <h3>{course.description_title1}</h3>
         <p>{course.description_details1}</p>
         <h3>{course.description_title1}</h3>
         <p>{course.description_details1}</p>
         </Grid>
        <Grid item lg={2} md={4} sm={12}>
        <VideoGridWrapper>
            <Grid >
        <vdoPlayerStyle>
          <div>
            <ReactPlayer 
            url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
            controls={false}
            loop={true}
            playing={true}
            onProgress={(progress)=>{
              setPlayed(progress.playedSeconds);
              
            }}
            onPlay={() => {
              console.log("play data sent");
              const response = api.post(VIDEOLOG_URL,
                JSON.stringify({ }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    'Access-Control-Allow-Credentials': true
                }
            );
            }}
            onPause={() => {
              console.log("pause data sent");
              const response = api.post(VIDEOLOG_URL,
                JSON.stringify({ }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    'Access-Control-Allow-Credentials': true
                }
            );
            }}
            // onProgress={console.log("playing")}
          /> 
          </div>
          </vdoPlayerStyle>
    </Grid>
    </VideoGridWrapper>
    </Grid>
    </Grid>
        
      </Box>
    </div>
    </div>
  )
}

export default CoursesDetails