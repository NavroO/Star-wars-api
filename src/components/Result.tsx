import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, FormControl, MenuItem, Select, CardHeader, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { FC, useState } from "react";
import { Film } from "../types/types";

type ResultProps = {
    characterName?: string;
    homeworldName?: string;
    homeworldPopulation?: string;
    films?: Film[];
};

const Result: FC<ResultProps> = ({ characterName, homeworldName, homeworldPopulation, films }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card sx={{mb: 4}}>
            <CardHeader
                title={characterName}
                onClick={handleExpandClick}
                action={
                    <IconButton aria-label="expand" onClick={handleExpandClick}>
                        <ExpandMoreIcon />
                    </IconButton>
                }
            />
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{ mb: 1 }}>
                        Homeworld: {homeworldName}
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Population: {homeworldPopulation}
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Movies
                    </Typography>
                    {films?.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            {films?.map((film) => (
                                <Card sx={{ minWidth: 275, mb: 4 }}>
                                    <CardContent>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default Result;