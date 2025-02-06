import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Grid,
  CardMedia,
  Button,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import Menu from "./Menu";
import ClearIcon from "@mui/icons-material/Clear";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from 'react-router-dom';

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pokemonBuscado, setpokemonBuscado] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();


  // Cargar Pokémon
  useEffect(() => {
    if (!pokemonBuscado) cargarPokemons(offset);
  }, [offset, pokemonBuscado]);

  const cargarPokemons = (offset) => {
    setCargando(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=60&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        Promise.all(data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json())))
          .then((pokemonsData) => {
            setPokemons((prev) => (offset === 0 ? pokemonsData : [...prev, ...pokemonsData]));
            setCargando(false);
          })
          .catch(() => setCargando(false));
      })
      .catch(() => setCargando(false));
  };

  const cargarMasPokemons = () => setOffset((prev) => prev + 60);

  // Buscar Pokémon
  const buscarPokemon = (pokemonBuscado) => {
    if (!pokemonBuscado) return setSearchResult(null);
    setCargando(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonBuscado.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult([data]);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  };

  const limpiarBusqueda = () => {
    setpokemonBuscado("");
    setSearchResult(null);
  };

  
  // Reconocimiento de voz
  const commands = [
    {
      command: "Buscar a *.",
      callback: (pokemonBuscado) => {
        setpokemonBuscado(pokemonBuscado);  // Actualiza el estado
        buscarPokemon(pokemonBuscado);  // Llama a buscarPokemon directamente después de actualizar el estado
      }
    },
    {
     command: "*Ir a inicio*",
      callback: () => navigate("/")  // Redirige a la página inicio
    }
        
  ];
  
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
    // Usa useSpeechRecognition para manejar los comandos de voz y obtener el texto transcrito.
  
    console.log(transcript) 
    // Muestra en la consola lo que el usuario ha dicho.
  

  if (!browserSupportsSpeechRecognition) {
    return <Typography>No se soporta reconocimiento de voz</Typography>;
  }

  if (cargando) {
    return (
      <Grid style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Menu />

      <Grid style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", marginTop: "120px"}}>
      <TextField
          label="Buscar Pokémon"
          variant="outlined"
          value={pokemonBuscado}
          onChange={(e) => setpokemonBuscado(e.target.value)} // Actualiza el estado de búsqueda con lo que el usuario escribe
          onKeyPress={(e) => e.key === 'Enter' && buscarPokemon()} // Ejecuta la búsqueda cuando el usuario presiona "Enter"
          style={{ marginRight: "10px", width: "300px" }}
          InputProps={{
            style: {
              backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff', // Color de fondo según el modo de color
              color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Color del texto según el modo de color
            },
          }}
        />

        <Button variant="contained" color="primary" onClick={buscarPokemon} style={{ marginRight: "10px" }}>
          Buscar
        </Button>
        {pokemonBuscado && (
          <IconButton onClick={limpiarBusqueda} color="secondary">
            <ClearIcon />
          </IconButton>
        )}
      </Grid>

     
    <Grid
      sx={{
        marginBottom: "15px",
        display: 'flex',
        justifyContent: {
        xs: 'center',  // Cuando el tamaño de la pantalla es 'xs', el contenido se centra
        sm: 'flex-start'  // Para tamaños mayores que 'xs', se alinea al principio (puedes cambiar esto según lo que necesites)
        }
        }}>    
    <Button variant="contained" color="primary" onClick={SpeechRecognition.startListening} sx={{ marginLeft: "10px"  }}>
      Escuchar
    </Button>
    <Button variant="contained" color="primary" onClick={SpeechRecognition.stopListening} sx={{ marginLeft: "10px" }}>
      Parar
    </Button>
  </Grid>
  <Grid 
  sx={{
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: 'lightblue',
    marginLeft: "10px",
    width: {
      xs: '90%',  
      sm: '60%',  
      md: '40%', 
      lg: '30%', 
      xl: '20%',  
    },
    margin: {
      xs: '0 auto',  
      sm: '0',       
    },
  }}
>
  <Typography variant="caption" color="textSecondary">
    Busca pokémons mediante el comando de voz "Buscar a ..." diciendo su nombre o número de pokédex
  </Typography>
</Grid>

  
      <Typography variant="h3" align="center" marginTop={"20px"} marginBottom={"20px"}>
        Pokédex
      </Typography>

  <Grid container spacing={2} justifyContent="center">
    {/* Si hay resultados de búsqueda, los mostramos primero */}
    {(searchResult || pokemons).map((pokemon) => ( 
      <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
        <Card style={{ height: "620px", marginLeft: "2px", marginRight: "2px" }}> 
          <CardMedia
          component="img"
          alt={pokemon.name}
          height="200"
          image={pokemon.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"}
          style={{ objectFit: "contain", width: "100%" }}
          />

        <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          
          <Typography variant="h5" component="div" style={{ marginBottom: "10px" }}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>

          <Typography variant="body2" color="text.secondary" style={{ marginBottom: "8px" }}>
            ID: {pokemon.id}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" style={{ marginBottom: "8px" }}>
            Peso: {pokemon.weight} | Altura: {pokemon.height}
          </Typography>
          
          <Typography variant="body1" component="div" style={{ marginTop: "10px", marginBottom: "10px" }}>
            <strong>Tipos:</strong>
            <List dense>
              {pokemon.types.map((tipo, index) => (
                <ListItem key={index} style={{ marginBottom: "4px" }}>{tipo.type.name}</ListItem>
                ))}
            </List>
          </Typography>
          
          <Typography variant="body1" component="div" style={{ marginTop: "10px" }}>
            <strong>Habilidades:</strong>
            <List dense>
              {pokemon.abilities.map((habilidad, index) => (
                <ListItem key={index} style={{ marginBottom: "4px" }}>{habilidad.ability.name}</ListItem>
                ))}
            </List>
          </Typography>
        </CardContent>
      </Card>
  </Grid>
 ))}
</Grid>

    {/* Botón para cargar más Pokémon */}
    {!searchResult && (
      <Grid style={{ textAlign: "center", marginTop: "50px", marginBottom: "35px"}}>
        <Button variant="contained" color="primary" onClick={cargarMasPokemons}>
          Cargar más Pokémon
        </Button>
      </Grid>
    )}

    </>
  );
}

export default Pokedex;