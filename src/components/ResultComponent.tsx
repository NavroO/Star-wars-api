import { Box, Typography, List, ListItem, ListItemText, Card, CardContent } from "@mui/material";
import { FC } from "react";
import { Film } from "../types/types";

type ResultProps = {
    characterName: string;
    homeworldName: string;
    homeworldPopulation: string;
    films: Film[];
};

const ResultComponent: FC<ResultProps> = ({ characterName, homeworldName, homeworldPopulation, films }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{characterName}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                Homeworld: {homeworldName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Population: {homeworldPopulation}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Movies:</Typography>
            {films.length > 0 && (
                <Box sx={{ mb: 2 }}>
                    {films.map((film) => (
                        <Card sx={{ minWidth: 275, mb: 4 }}>
                            <CardContent>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{ fontSize: 24, mr: 4 }} color="text.secondary" gutterBottom>
                                        {film.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Release Date: {film.releaseDate}
                                    </Typography>
                                </Box>
                                <Typography variant="body2">
                                    {film.openingCrawl}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default ResultComponent;