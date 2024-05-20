"use client";

import { useUIStore, useUserStore } from '@/store';
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
import { useRouter } from "next/navigation";


export const Sidebar = () => {

   const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
   const closeMenu = useUIStore((state) => state.closeSideMenu);
   const router = useRouter();

   const session = useUserStore((state) => state.session);
   const clearSession = useUserStore((state) => state.clearSession);

   const navigateTo = (paht: string) => {
      router.push(paht);
   }

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
                  {
                     !session ? (
                        <>
                           <ListItemButton onClick={() => navigateTo('/auth/login')}>
                              <ListItemIcon>
                                 <AccountCircleOutlinedIcon fontSize='large' />
                              </ListItemIcon>
                              <ListItemText primary={'Iniciar sesión'} />
                           </ListItemButton>
                           <Divider />
                        </>
                     ) : (
                        <>
                           <ListItemButton onClick={() => navigateTo('/chat/public')}>
                              <ListItemIcon>
                                 <ChatOutlinedIcon fontSize='large' />
                              </ListItemIcon>
                              <ListItemText primary={'Salas Chat Públicas'} />
                           </ListItemButton>
                           <Divider />
                           <ListItemButton onClick={() => navigateTo('/chat/private')}>
                              <ListItemIcon>
                                 <ThreePOutlinedIcon fontSize='large' />
                              </ListItemIcon>
                              <ListItemText primary={'Chat Privados'} />
                           </ListItemButton>
                           <Divider />
                           {
                              session.role === 'Admin' && (
                                 <>
                                    <ListItemButton onClick={() => navigateTo('/admin/public-chat-list')}>
                                       <ListItemIcon>
                                          <ModeEditOutlineOutlinedIcon fontSize='large' />
                                       </ListItemIcon>
                                       <ListItemText primary={'Gestión de Salas Públicas'} />
                                    </ListItemButton>
                                    <Divider />
                                 </>
                              )
                           }
                           <ListItemButton onClick={clearSession}>
                              <ListItemIcon>
                                 <LogoutOutlinedIcon fontSize='large' />
                              </ListItemIcon>
                              <ListItemText primary={'Cerrar sesión'} />
                           </ListItemButton>
                           <Divider />
                        </>
                     )
                  }
               </List>
            </Box>
         </Drawer>
      </div>
   );
}