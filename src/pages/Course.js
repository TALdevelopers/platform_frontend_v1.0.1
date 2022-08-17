import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ReactPlayer from "react-player";
import api from '../api/Axios';

const VIDEOLOG_URL = '/videologdata';

const Course = () => {

  const [played, setPlayed] = useState(0);
  // sx={{ display:"flex", flexDirection:"column" }}

  return (
    <Box sx={{ margin:'15px' }}>
      <Grid container columnGap={0} >
        <Grid item xs={12} md={6} lg={6}>
        <ReactPlayer
            url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
            controls={true}
          
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h4">Coure Title Here</Typography>
            <Typography variant="h5">Video title here</Typography>
            <Typography variant="h6">Video description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Course