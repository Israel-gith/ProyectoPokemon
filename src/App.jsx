import 'regenerator-runtime/runtime';
import React from 'react';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '@fontsource/press-start-2p';

// Crear un tema personalizado 
const theme = createTheme({
  palette: {
    primary: {
      main: '#ef5350', // Rojo 
    },
    secondary: {
      main: '#ff752e', // Naranja 
    },
    background: {
      default: '#263238', // Gris oscuro 
    },
    text: {
      primary: '#FFFFFF', // Texto blanco
      secondary: '#2e2e2e', // Texto gris oscuro para subtítulos
    },
  },
  typography: {
    fontFamily: '"Press Start 2P" ', // Usar Press Start 2P como fuente principal
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          backgroundColor: '#ef5350', // Rojo claro para los botones
          color: '#FFFFFF', // Texto blanco en los botones
          '&:hover': {
            backgroundColor: '#B71C1C', // Rojo más oscuro en hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#b2b2b2', // Gris suave para las cards
          color: '#000000', // Texto negro dentro de las cards
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/pokedex',
        element: <Pokedex />
      }
    ]
  }
]);

function App() {
  return (
  
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
