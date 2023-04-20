import { Container, TextField, Button, Typography, Skeleton, Autocomplete } from "@mui/material";
import { useSearchController } from "./hooks/useSearchController";
import Result from "./components/Result";
import Error from "./components/Error";

const App = () => {

  const {
    setSearchTerm,
    loading,
    error,
    searchResult,
    handleSearch,
    characters,
  } = useSearchController();

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
        <Error />
      )}

      {searchResult && (
        <>
          <Result
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
