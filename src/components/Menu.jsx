import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Link } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText, Tooltip, Zoom } from '@mui/material';
import {Menu as MenuIcon, Home as HomeIcon } from '@mui/icons-material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';


function Menu() {

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            width: `calc(100% - 240px)`,
            marginLeft: '240px',
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),backgroundColor: '#ef5350'
        }}
      >
    <Toolbar>
      <Tooltip title="Menu" placement="right" arrow
        slots={{
          transition: Zoom,
         }} >
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
       </Tooltip>


       <IconButton variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
        <img src="/logo_pokemon.png" alt="Logo Pokémon" style={{ width: '210px', height: '85px' }} />
       </IconButton>
       
       <IconButton color="inherit" edge="end">
        <img src="/pokebola.png" alt="Logo Pokémon" style={{ width: '60px', height: '60px' }} />
       </IconButton>

    </Toolbar>


      </AppBar>
      <Drawer
  sx={{
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: '#263238', // Color de fondo oscuro
      color: 'white', // Color del texto dentro del drawer
    },
  }}
  variant="persistent"
  anchor="left"
  open={open}
>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }}
  >
    <Tooltip title="Atras" placement="left" arrow slots={{ transition: Zoom }}>
      <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </Tooltip>
  </Box>

  <Tooltip title="Ir a Home" placement="right" arrow slots={{ transition: Zoom }}>
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem>
        <ListItemIcon sx={{ color: 'white' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" sx={{ color: 'white' }} />
      </ListItem>
    </Link>
  </Tooltip>

  <Tooltip title="Pokedex" placement="right" arrow slots={{ transition: Zoom }}>
    <Link to="/pokedex" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem>
        <ListItemIcon sx={{ color: 'white' }}>
          <CatchingPokemonIcon />
        </ListItemIcon>
        <ListItemText primary="Pokedex" sx={{ color: 'white' }} />
      </ListItem>
    </Link>
  </Tooltip>
</Drawer>

    </Box>
  );
}

export default Menu;