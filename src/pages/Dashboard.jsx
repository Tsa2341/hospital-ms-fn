import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import {
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiUsers
} from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { IoCalculatorOutline } from 'react-icons/io5';
import { RiCalendarTodoLine } from 'react-icons/ri';
import { VscGraphLine } from 'react-icons/vsc';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DashboardContextProvider, {
  DashboardContext
} from '../context/DashboardContext';

const listItems = [
  {
    listIcon: <FiUsers className="text-[20px]" />,
    listText: 'Patients'
  },
  {
    listIcon: <RiCalendarTodoLine className="text-[20px]" />,
    listText: 'Schedule'
  },
  {
    listIcon: <VscGraphLine className="text-[20px]" />,
    listText: 'Analytics'
  },
  {
    listIcon: <IoCalculatorOutline className="text-[20px]" />,
    listText: 'Calculator'
  },
  {
    listIcon: <BsPlusCircle className="text-[20px]" />,
    listText: 'Add'
  }
];

const accItems = [
  {
    listIcon: <AiOutlineUser className="text-[20px]" />,
    listText: 'Account'
  }
];

const LeftSideList = ({ toggleLeftSideBar }) => {
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        className="relative w-full h-full border-r border-[#0093df] overflow-auto flex flex-col bg-[#fff] "
        component="div"
      >
        <Box className="h-[64px]" sx={{ display: { md: 'none', xs: 'block' } }}>
          <IconButton
            onClick={toggleLeftSideBar}
            sx={{
              padding: 1
            }}
          >
            <GrClose />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#0093df' }} />
        <Box className="h-[calc(100%-64px)] flex flex-col justify-between">
          <Box className="h-[55%]">
            <List>
              {listItems.map((listItem, index) => (
                <ListItem
                  id="demo-positioned-button"
                  aria-controls={
                    openMenu && index === 4 ? 'demo-positioned-menu' : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openMenu && index === 4 ? 'true' : undefined}
                  onClick={index === 4 ? handleClick : undefined}
                >
                  <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                  <ListItemText primary={listItem.listText} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider sx={{ borderColor: '#0093df' }} />
          <Box className="h-[45%]  border-t border-[#0093df]">
            <List>
              {accItems.map((listItem) => (
                <ListItem>
                  <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                  <ListItemText primary={listItem.listText} />
                </ListItem>
              ))}
              <ListItem
                onClick={() => {
                  localStorage.removeItem('userLoginData');
                }}
              >
                <ListItemIcon>
                  <FiLogOut className="text-[20px]" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          className="text-[16px] text-slate-500"
          onClick={() => {
            handleClose();
            nav('/dashboard/add/speciality');
          }}
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Speciality
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav('/dashboard/add/doctor');
          }}
          className="text-[16px] text-slate-500"
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Doctor
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav('/dashboard/patient');
          }}
          className="text-[16px] text-slate-500"
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Patient
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav('/dashboard/add/schedule');
          }}
          className="text-[16px] text-slate-500"
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Work schedule
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const Dashboard = () => {
  const { pathname } = useLocation();
  const userData = JSON.parse(localStorage.getItem('userLoginData'));

  const [openLeftSideBar, setOpenLeftSideBar] = useState(false);
  const [openRightSideBar, setOpenRightSideBar] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { rightSideBarContent, rightSideBarSize } =
    useContext(DashboardContext);

  const toggleLeftSideBar = () => {
    setOpenLeftSideBar((open) => !open);
  };
  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };
  const removeToken = (event) => {
    event.preventDefault();
    // localStorage.removeItem('userLoginData');
  };

  useEffect(() => {
    console.log('rightSideBarContent', rightSideBarContent);
    if (!isMobile && !openLeftSideBar) {
      setOpenLeftSideBar(true);
    } else {
      setOpenLeftSideBar(false);
    }
    if (!isMobile && !openRightSideBar && rightSideBarContent) {
      setOpenRightSideBar(true);
    } else {
      setOpenRightSideBar(false);
    }
  }, [isMobile]);

  if (!userData?.token) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }
  if (pathname === '/dashboard') {
    switch (userData.user.role_id) {
      case 3:
        return <Navigate to="/dashboard/account" replace />;
      case 2:
        return <Navigate to="/dashboard/schedule" replace />;
      case 1:
        return <Navigate to="/dashboard/schedule" replace />;
      default:
    }
  }

  return (
    <Box className="flex flex-col w-full h-full overflowy-hidden">
      <Box
        className="flex flex-row items-center justify-between"
        sx={{
          width: '100%',
          height: '98px'
        }}
      >
        <Box className="flex flex-row items-center">
          <IconButton
            onClick={toggleLeftSideBar}
            sx={{ display: { md: 'none', xs: 'block' } }}
          >
            <FaBars />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="primary"
            fontWeight="bold"
            fontSize="16px"
          >
            MedStem
          </Typography>
        </Box>
        <Box className="pr-5">
          <Typography variant="subtitle1" color="primary">
            <p className="leading-5">Hello,</p>
            <p className="leading-5">Dr. Kim</p>

            {rightSideBarContent && (
              <IconButton
                sx={{
                  position: 'absolute',
                  backgroundColor: '#9b9b9b2d',
                  color: '#000',
                  top: '60px',
                  right: '16px',
                  display: { md: 'none', xs: 'block' }
                }}
              >
                <FiChevronLeft onClick={toggleRightSideBar} />
              </IconButton>
            )}
          </Typography>
        </Box>
      </Box>
      <Box className="flex flex-row w-full grow overflow-y-auto">
        <Drawer
          open={openLeftSideBar}
          anchor="left"
          variant={isMobile ? 'temporary' : 'permanent'}
          onClose={() => {
            setOpenLeftSideBar(false);
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: '250px'
            }
          }}
          classes={{
            paper: 'relative'
          }}
          ModalProps={{
            keepMounted: false
          }}
          className="transition duration-150 ease-in-out"
        >
          <LeftSideList toggleLeftSideBar={toggleLeftSideBar} />
        </Drawer>
        <Box className="flex-1 h-full overflow-y-auto">
          <Outlet />
        </Box>
        {rightSideBarContent && (
          <Drawer
            open={openRightSideBar}
            anchor="right"
            variant={isMobile ? 'temporary' : 'permanent'}
            onClose={() => {
              setOpenRightSideBar(false);
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: rightSideBarSize || '250px'
              }
            }}
            classes={{
              paper: 'relative'
            }}
            ModalProps={{
              keepMounted: false
            }}
            className="transition duration-150 ease-in-out"
          >
            {rightSideBarContent}
          </Drawer>
        )}
      </Box>
    </Box>
  );
};

export default () => (
  <DashboardContextProvider>
    <Dashboard />
  </DashboardContextProvider>
);
