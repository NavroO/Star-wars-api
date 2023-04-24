import { Container, TextField, Button, Typography, Skeleton, Autocomplete, Select, MenuItem, Box, FormControl, InputLabel, Input } from "@mui/material";
import { useSearchController } from "./hooks/useSearchController";
import Result from "./components/Result";
import { useCharacterController } from "./hooks/useCharacterController ";
import { usePlanetController } from "./hooks/usePlanetController";
import { useState } from "react";
import { Resident } from "./types/types";

export const App = () => {

  const {
    searchTerm,
    setSearchTerm,
    loading,
    searchResult,
    handleSearch,
  } = useSearchController();

  const { characters } = useCharacterController();
  const { planets } = usePlanetController();


  const [searchOption, setSearchOption] = useState("characters");
  const [minPopulation, setMinPopulation] = useState<number>();
  const [maxPopulation, setMaxPopulation] = useState<number>();

  const handleMinPopulationChange = (event: any) => {
    setMinPopulation(parseInt(event.target.value));
  };

  const handleMaxPopulationChange = (event: any) => {
    setMaxPopulation(parseInt(event.target.value));
  };

  const handleSearchOptionChange = (event: any) => {
    setSearchOption(event.target.value);
    setSearchTerm("");
  };

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
      <Box sx={{ display: 'flex', alignItems: "center", mb: 2 }}>
        {searchOption == "population" ? (
          <>
            <Input type="number" sx={{ mr: 2 }} placeholder="Min" value={minPopulation} onChange={handleMinPopulationChange} />
            <Input type="number" sx={{ mr: 2 }} placeholder="Max" value={maxPopulation} onChange={handleMaxPopulationChange} />
          </>
        ) : (
          <Autocomplete
            disablePortal
            options={searchOption === "characters" ? characters.map((character) => character.name) : planets.map((planet) => planet.name)}
            sx={{ width: "70%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  searchOption === "characters"
                    ? "Enter character name..."
                    : "Enter planet name..."
                }
              />
            )}
            onInputChange={(event, value) => setSearchTerm(value)}
          />
        )}
        <FormControl sx={{ width: "30%" }}>
          <InputLabel>Search type</InputLabel>
          <Select
            label="Search type"
            value={searchOption}
            onChange={handleSearchOptionChange}
          >
            <MenuItem value="characters">Characters</MenuItem>
            <MenuItem value="planets">Planets</MenuItem>
            <MenuItem value="population">Population</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSearch(searchOption, minPopulation, maxPopulation)}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Loading..." : "Search"}
      </Button>

      {searchResult && (
        <div>
          {searchOption === "characters" && (
            <Result
              characterName={searchResult.character?.name}
              homeworldName={searchResult.character?.homeworld}
              homeworldPopulation={searchResult.character?.population}
              films={searchResult.films}
            />
          )}

          {searchOption === "planets" && searchResult.residents && (
            <>
              {searchResult.residents.map((resident: Resident) => (
                <Result
                  characterName={resident.name}
                  homeworldName={searchResult.planet?.name}
                  homeworldPopulation={searchResult.planet?.population}
                  films={resident.films}
                />
              ))}
            </>
          )}

          {searchOption === "population" && Array.isArray(searchResult) && (
            <div>
              {searchResult.map((planetData) => (
                <>
                  {planetData.residents.map((resident: Resident) => (
                    <Result
                      characterName={resident.name}
                      homeworldName={planetData.planet?.name}
                      homeworldPopulation={planetData.planet?.population}
                      films={resident.films}
                    />
                  ))}
                </>
              ))}
            </div>
          )}
        </div>
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