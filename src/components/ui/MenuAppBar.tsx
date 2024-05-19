"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import { useUIStore } from "@/store";
import { Button, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { stateUser } from '@/store/userState';


export const MenuAppBar = () => {

  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const user = stateUser((state) => state.user);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectMyProfile = () => {
    setAnchorEl(null);
    router.push('/profile');
  }

  const handleSelectChangePassword = () => {
    setAnchorEl(null);
    router.push('/profile/change-password');
  }

  const handleLogIn = () => {
    setAnchorEl(null);
    router.push('/auth/login');
  }
  return (
      <AppBar position="sticky" sx={{ justifyContent: 'space-between' }}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openSideMenu}
          >
            <MenuIcon sx={{ color: 'rgba(44, 62, 80, 1)' }} fontSize='large' />
          </IconButton>
          <Box flex={1} />
          <Link href="/" style={{ textDecoration: 'none' }} >
            <Typography
              variant="h1"
              component="div"
              color={'rgba(44, 62, 80, 1)'}
              sx={{ border: 'solid', width: '230px', textAlign: 'center', padding: '5px', borderRadius: '20px' }}
              className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
            >
              RoomTalks
            </Typography>
          </Link>

          <Box flex={1} />
          {auth && (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='text'
                color='primary'
              >
                {user?.name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem sx={{ minWidth: '170px' }} onClick={handleSelectMyProfile} >
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>Ver mi Perfil</ListItemText>
                </MenuItem>
                <MenuItem sx={{ minWidth: '170px' }} onClick={handleSelectChangePassword}>
                  <ListItemIcon>
                    <KeyOutlinedIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>Cambiar Contraseña</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
  );
}