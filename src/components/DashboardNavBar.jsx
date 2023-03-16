import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function DashboardNavBar({
  rightSideBarContent,
  toggleRightSideBar,
  toggleLeftSideBar
}) {
  const loggedInUser = useSelector((state) => state.user.loginData);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (loggedInUser?.role_id === 2) {
      setIsDoctor(true);
    }
    if (loggedInUser?.role_id === 1) {
      setIsAdmin(true);
    }
  }, [loggedInUser]);

  console.log({ loggedInUser });
  console.log(loggedInUser?.last_name);
  return (
    <Box
      className="flex flex-row items-center justify-between border-b border-primary min-h-[64px] pl-4"
      sx={{
        width: '100%',
        height: '64px'
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
          {isDoctor && (
            <p className="leading-5">Dr. {loggedInUser?.last_name}</p>
          )}
          {isAdmin && (
            <p className="leading-5">Admin {loggedInUser?.last_name}</p>
          )}

          {rightSideBarContent && (
            <IconButton
              sx={{
                position: 'absolute',
                backgroundColor: '#9b9b9b2d',
                color: '#000',
                top: '64px',
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
  );
}

export default DashboardNavBar;
