import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import './Navigationbar.css';
import { styled } from "@mui/material/styles";

const regBtnStyle = styled(Button)(({ theme }) => ({
  '&:hover': {
    background: "#f00",
  }    
}));


const pages = [
  {title: 'Courses', href: '/courses'}, 
  {title: 'Book an apointment', href: '/apointment'}, 
  {title: 'Life', href: '/life'}, 
  {title: 'Group', href: '/group'}, 
  {title: 'Store', href: '/store'}];
// const pages = ['Courses', 'Book an apointment', 'Life', 'Group', 'Store'];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// const userAuthenticated = true;

const Navigationbar = (props) => {

  const user = props.user;
  console.log("printed from navbar component: "+user)
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/api/logout`, "_self");
	};

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="sticky" className='AppBar' style={{ backgroundColor:'var(--primaryColor)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography><Link to={page.href} style={{ textDecoration:'none', color:'var(--black)' }}>{ page.title }</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, justifyContent: 'center' , display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button className='NavMenus'
                key={page.title}
                onClick={handleCloseNavMenu}
                textAlign="center"
                sx={{ my: 2, color: 'white', display: 'block', padding: '0 15px' }}
              >
                <Link to={page.href} style={{ textDecoration:'none', color:'var(--white)' }}>{page.title}</Link>
              </Button>
            ))}
          </Box>
        {user ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem onClick={handleCloseUserMenu}>
                  {/* <Typography textAlign="center">Profile</Typography> */}
                  <Typography textAlign="center" onClick={logout}>Logout</Typography>
                </MenuItem>
            
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          : 
          <Stack spacing={2} direction="row" >
          <Link className='Link' style={{textDecoration:"none"}} to="/login"><Button className='Login' variant="contained" style={{ backgroundColor: 'var(--primaryWhite)', color:'var(--white)' }}>Login</Button></Link>
          <Link className='Link' style={{textDecoration:"none"}} to="/registration">
         
            <Button variant="outlined" style={{ borderColor: 'var(--white)', color:'var(--white)'}}>Sign up</Button>
            
            </Link>
          </Stack>
          
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};



export default Navigationbar