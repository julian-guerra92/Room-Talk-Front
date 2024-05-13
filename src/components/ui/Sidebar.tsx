"use client";

import { useUIStore } from '@/store';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ThreePOutlinedIcon from '@mui/icons-material/ThreePOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Typography } from '@mui/material';
import { titleFont } from '@/config/fonts';


export const Sidebar = () => {

   const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
   const closeMenu = useUIStore((state) => state.closeSideMenu);

   return (
      <div>
         <Drawer
            open={isSideMenuOpen}
            onClose={closeMenu}
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
         >
            <Box
               sx={{ width: 400, height: '100%', bgcolor: 'rgba(138, 182, 214, 1)', paddingTop: 5 }}
               role="presentation"
               onClick={closeMenu}
            >
               <Typography
                  variant='h1'
                  marginLeft={2}
                  className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
               >
                  Menú
               </Typography>
               <List>
                  <ListItemButton>
                     <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize='large' />
                     </ListItemIcon>
                     <ListItemText primary={'Log In'} />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton>
                     <ListItemIcon>
                        <ChatOutlinedIcon fontSize='large' />
                     </ListItemIcon>
                     <ListItemText primary={'Salas de Chat'} />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton>
                     <ListItemIcon>
                        <ThreePOutlinedIcon fontSize='large' />
                     </ListItemIcon>
                     <ListItemText primary={'Chat Privados'} />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton>
                     <ListItemIcon>
                        <ModeEditOutlineOutlinedIcon fontSize='large' />
                     </ListItemIcon>
                     <ListItemText primary={'Gestión de Salas Públicas'} />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton>
                     <ListItemIcon>
                        <LogoutOutlinedIcon fontSize='large' />
                     </ListItemIcon>
                     <ListItemText primary={'Log Out'} />
                  </ListItemButton>
                  <Divider />
               </List>
            </Box>
         </Drawer>
      </div>
   );
}