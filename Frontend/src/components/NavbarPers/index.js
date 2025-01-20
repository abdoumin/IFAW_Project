import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Stack,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from "../../pages/login/AuthenticationService";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  let isLoggedIn = AuthenticationService.isUserLoggedIn();

  const logout = () => {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #1a237e 0%, #283593 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              sx={{ 
                ml: 'auto',
                color: 'white'
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {/* Navigation Links */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ flexGrow: 1 }}
              >
                <Button
                  component={Link}
                  to="/estivages"
                  sx={{
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '2px',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '80%',
                    },
                  }}
                >
                  HOME
                </Button>
                <Button
                  component={Link}
                  to="/reservations"
                  sx={{
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '2px',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '80%',
                    },
                  }}
                >
                  Mes Demandes
                </Button>
              </Stack>

              {/* Login/Logout Button */}
              <Button
                onClick={isLoggedIn ? logout : () => navigate('/login')}
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  color: 'white',
                  px: 3,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
