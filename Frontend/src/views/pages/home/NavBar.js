import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import { getUser } from 'store/authSlice';
import BackgroundLetterAvatars from 'ui-component/avatar/BackgroundLetterAvatar';
import logo from 'assets/logo/logo-white.svg';

const HomeNavBar = () => {
  const user = useSelector(getUser);

  return (
    <AppBar sx={{ background: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="MonBudget" width="150" />
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 3,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            {/* Add your text here */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: {  md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
            {user?.id ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/dashboard" sx={{ textDecoration: 'none', color: 'white', marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
                  {user?.userInfo?.lastname + ' ' + user?.userInfo?.firstname}
                  <BackgroundLetterAvatars fullname={`${user.userInfo?.firstName} ${user.userInfo?.lastName}`} sx={{ marginRight: '8px' }} />
                </Link>
              </Box>
            ) : (
              <>
                <Link href="/login">
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>Se connecter</Button>
                </Link>

                <Link href="/register">
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>S&apos;inscrire</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeNavBar;
  