import { Container, TextField, Button, CircularProgress, Typography, Skeleton, Autocomplete } from "@mui/material";
import useSearchController from "./hooks/useSearchController";
import ResultComponent from "./components/Result";
import ErrorComponent from "./components/Error";
import { useEffect, useState } from "react";
import { Character } from "./types/types";

const App = () => {

  const [characters, setCharacters] = useState<Character[]>([]);

  const {
    searchTerm,
    setSearchTerm,
    loading,
    error,
    searchResult,
    handleSearch,
  } = useSearchController();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();
        setCharacters(data.results.map((character: Character) => character.name));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography sx={{
        color: "#999999"
      }}>Trooper Report:</Typography>
      <Typography sx={{
        color: "#222222", fontSize: "35px", fontWeight: 400, letterSpacing: "-0.02em", mb: 8
      }}>
        This is the page you are looking for..
      </Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={characters}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField {...params} label="Enter character name..." />
        )}
        onInputChange={(event, value) => setSearchTerm(value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Loading..." : "Search"}
      </Button>
      {error && (
        <ErrorComponent />
      )}

      {searchResult && (
        <>
          <ResultComponent
            characterName={searchResult.character.name}
            homeworldName={searchResult.character.homeworld}
            homeworldPopulation={searchResult.character.population}
            films={searchResult.films}
          />
        </>
      )}
      {loading && (
        <>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="rounded" height={60} />
        </>
      )}
    </Container>
  );
}

export default App;
