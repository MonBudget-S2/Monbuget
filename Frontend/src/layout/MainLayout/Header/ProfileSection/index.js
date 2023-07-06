import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
// import User1 from 'assets/images/users/user-round.svg';
// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons';

import { authenticateUser, getUser } from 'store/authSlice';
import { initialState } from 'store/customizationReducer';
import BackgroundLetterAvatars from 'ui-component/avatar/BackgroundLetterAvatar';
import userService from "../../../../service/userService";


// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const [avatarImg, setAvatarImg] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch(authenticateUser(initialState));
    navigate('/login');
  };

  const fetchImage = async () => {
    // Effectuez votre requête pour obtenir les données de l'image (par exemple, via Axios)
    if (user.userInfo.avatarUrl)
    {
      const response = await userService.getAvatar(user.userInfo.avatarUrl);
      // Convertissez les données binaires en une chaîne Base64
      const base64Image = btoa(
          new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
          )
      );

      // Créez l'URL d'objet à partir de la chaîne Base64
      const imageUrl = `data:image/png;base64,${base64Image}`;
      // Mettez à jour l'état avec l'URL de l'image
      setAvatarImg(imageUrl);
    }
    else {
      setAvatarImg(null);
    }



  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };



  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    fetchImage();
  },[]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          avatarImg ? <Avatar src={avatarImg}  /> : <BackgroundLetterAvatars fullname={user?.userInfo?.firstName + ' ' + user.userInfo.lastName} anchorRef={anchorRef} open={open} />

          // <Avatar
          //   sx={{
          //     ...theme.typography.mediumAvatar,
          //     margin: '8px 0 8px 8px !important',
          //     cursor: 'pointer',
          //     backgroundColor: deepOrange[500] // Customize the background color
          //   }}
          //   ref={anchorRef}
          //   aria-controls={open ? 'menu-list-grow' : undefined}
          //   aria-haspopup="true"
          //   color="inherit"
          // >

          // </Avatar>
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {user?.userInfo?.lastname + ' ' + user?.userInfo?.firstname}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">{user.role}</Typography>
                    </Stack>

                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, 'profil')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Profil</Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Se déconnecter</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
