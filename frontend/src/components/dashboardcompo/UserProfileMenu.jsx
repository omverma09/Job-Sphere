import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ← adjust path to your real hook

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  Home as HomeIcon,
  Description as ApplicationsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

export default function UserProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    alert("You logged-out");
    navigate("/")
    handleClose();
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt={user.name || 'User'}
            src={user.profilePic?.url || user.avatarUrl}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2.5, py: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email || 'No email'}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginTop={1} fontWeight={600}>
            <Link className='mt-100 Edit-profile-option' to="/student/dashboard/update-profile">
              Edit Profile
            </Link>
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={() => navigate('/student/dashboard')}>
          <ListItemIcon><HomeIcon fontSize="small" /></ListItemIcon>
          Home
        </MenuItem>

        <MenuItem onClick={() => navigate('/student/dashboard/my-application')}>
          <ListItemIcon><ApplicationsIcon fontSize="small" /></ListItemIcon>
          My Applications
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}