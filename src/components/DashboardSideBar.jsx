import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Drawer,
  Typography
} from '@mui/material';
import { AiOutlineUser } from 'react-icons/ai';
import { FaApple } from 'react-icons/fa';
import { GrAidOption, GrClose } from 'react-icons/gr';
import {
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiUsers
} from 'react-icons/fi';
import { RiCalendarTodoLine, RiBillLine } from 'react-icons/ri';
import { VscGraphLine } from 'react-icons/vsc';
import { FaBars } from 'react-icons/fa';
import { IoCalculatorOutline } from 'react-icons/io5';
import { BsPlusCircle } from 'react-icons/bs';
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
  },
  {
    listIcon: <FiLogOut className="text-[20px]" />,
    listText: 'Log out'
  }
];

const DashboardSideBar = () => {
  const [open, setOpen] = useState(false);
  const [openRightSideBar, setOpenRightSideBar] = useState(false);
  const [showRightBar, setShowRightBar] = useState(false); // This state willl be set to true when we are on pages with right side bar

  const toggleSlider = () => {
    setOpen((open) => !open);
  };
  const toggleRightBar = () => {
    setOpenRightSideBar((open) => !open);
  };

  const RightSideList = () => (
    <Box
      className={`w-[220px] border-l border-[#0093df] overflow-auto flex flex-col fixed bg-[#fff]  top-[60px] lg:top-0 right-0 bottom-0 z-20`}
      component="div"
    >
      <Box
        className="h-[64px] relative"
        sx={{ display: { md: 'none', xs: 'block' } }}
      >
        <IconButton
          onClick={toggleRightBar}
          sx={{
            position: 'absolute',
            backgroundColor: '#9b9b9b2d',
            color: '#000',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            right: '165px',
            display: { md: 'none', xs: 'block' }
          }}
        >
          <FiChevronRight />
        </IconButton>
      </Box>
      <Divider />
      <Box className="h-[calc(100%-64px)] flex flex-col justify-between">
        <Box className="h-[55%]">
          <List>
            <ListItem button>
              <ListItemText primary={'09:00 - 10:00'} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={'10:00 - 11:00'} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={'11:00 - 12:00'} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={'12:00 - 13:00'} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );

  const LeftSideList = () => (
    <Box
      className={`w-[220px] border-r border-[#0093df] overflow-auto flex flex-col fixed bg-[#fff]  top-[60px] lg:top-0 left-0 bottom-0 z-20`}
      component="div"
    >
      <Box
        className="h-[64px] relative"
        sx={{ display: { md: 'none', xs: 'block' } }}
      >
        <IconButton
          onClick={toggleSlider}
          sx={{
            position: 'absolute',
            transform: 'translate(-10%, -50%)',
            top: '50%',
            right: '20px'
          }}
        >
          <GrClose />
        </IconButton>
      </Box>
      <Divider />
      <Box className="h-[calc(100%-64px)] flex flex-col justify-between">
        <Box className="h-[55%]">
          <List>
            {listItems.map((listItem, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                <ListItemText primary={listItem.listText} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className="h-[45%]  border-t border-[#0093df]">
          <List>
            {accItems.map((listItem, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                <ListItemText primary={listItem.listText} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box>
      <CssBaseline />

      <Box component="nav" className="fixed left-0 top-0 right-0 z-50">
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#ffff',
            boxShadow: 'none',
            borderBottom: '1px solid #0093df78'
          }}
        >
          <Toolbar sx={{ paddingX: { md: '24px', xs: '2px' } }}>
            <Box className="flex items-center justify-between w-[100%]">
              <Box className="flex items-center">
                <IconButton
                  onClick={toggleSlider}
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
                  Hello,
                  <br /> Dr. Kim
                  {showRightBar && (
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
                      <FiChevronLeft onClick={toggleRightBar} />
                    </IconButton>
                  )}
                </Typography>
              </Box>
            </Box>
            <Drawer
              open={open}
              anchor="left"
              onClose={toggleSlider}
              sx={{ display: { md: 'none', xs: 'block' }, width: '220px' }}
              className="transition duration-150 ease-in-out"
            >
              {LeftSideList()}
            </Drawer>
            {/* For pages with right bar */}
            {showRightBar && (
              <Drawer
                open={openRightSideBar}
                anchor="right"
                onClose={toggleRightBar}
                sx={{ display: { md: 'none', xs: 'block' }, width: '220px' }}
                className="transition duration-150 ease-in-out"
              >
                {RightSideList()}
              </Drawer>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {showRightBar && (
        <Box
          component="nav"
          className="w-fit"
          sx={{ display: { md: 'block', xs: 'none' } }}
        >
          <Box>{RightSideList()}</Box>
        </Box>
      )}

      <Box
        component="nav"
        className="w-fit"
        sx={{ display: { md: 'block', xs: 'none' } }}
      >
        <Box>{LeftSideList()}</Box>
      </Box>
    </Box>
  );
};

export default DashboardSideBar;
