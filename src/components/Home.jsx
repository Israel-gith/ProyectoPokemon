import { Button, Typography, Grid } from "@mui/material";  // Asegúrate de importar Paper
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Menu from "./Menu";

function Home() {
  const navigate = useNavigate();

  // Reconocimiento de voz
  const commands = [
    {
      command: "*Ir a pokédex*",
      callback: () => navigate("/pokedex")  // Redirige a la página de Pokedex
    }
  ];

  const { browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <Typography>No se soporta reconocimiento de voz</Typography>;
  }

  return (
    <>
      <Menu />
      <Grid 
        container 
        direction="column" 
        alignItems="center" 
        justifyContent="center"
        sx={{ padding: '20px', marginTop:"100px"}}
      >
        {/* Título principal */}
        <Grid sx={{ padding: '30px', borderRadius: '10px', backgroundColor: 'lightblue', textAlign: 'center' }}>
          <Typography variant="h4" color="primary">
          Proyecto de iniciación a Interfaces Naturales de Usuario
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Explora la Pokédex mediante comandos de voz o botones
          </Typography>
        </Grid>

        <Grid container spacing={2} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
          <Grid item>
            {/* Botón de escuchar */}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={SpeechRecognition.startListening} 
              sx={{ marginLeft: "10px" }}
            >
              Escuchar
            </Button>
          </Grid>
          <Grid item>
            {/* Botón de parar */}
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={SpeechRecognition.stopListening} 
              sx={{ marginLeft: "10px" }}
            >
              Parar
            </Button>
          </Grid>
        </Grid>

        <Grid 
          container 
          direction="column" 
          alignItems="center" 
          justifyContent="center" 
          sx={{ marginTop: '40px' }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/pokedex")} 
            sx={{ padding: '10px 20px' }}
          >
            Ir a la Pokédex
          </Button>
          <br />
          <Grid sx={{ padding: '10px', borderRadius: '10px', backgroundColor: 'lightblue', textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="textSecondary" 
          >
            O di "Ir a pokédex" para comenzar con la búsqueda de Pokémon
          </Typography>
          </Grid>
        </Grid>
      </Grid>
      <br />
    </>
  );
}

export default Home;
