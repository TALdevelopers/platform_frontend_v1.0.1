import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from "@mui/material/styles";

import './Offer.css'

const OfferSection = {
    backgroundColor: "var(--secondaryColor)",
    height: "36px",
    minHeight: "36px"
}

// const OfferSection = styled("Appbar")(({ theme }) => ({
//   backgroundColor: "var(--secondaryColor)",
//     height: "36px",
//     minHeight: "36px"
  

// }));

const ToolbarSection = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}

const TypographySection = {
  paddingTop: "7px"
}


const Offer = () => {

  return (
    
      <AppBar position="static" style={OfferSection}>
        <Toolbar style={ToolbarSection}>
          <Typography style={TypographySection} sx={{ flexGrow: 1, textAlign:'center', fontSize:'1rem' }}>
            This is the offer text placeholder
          </Typography>
        </Toolbar>
      </AppBar>
    
  )
}

export default Offer