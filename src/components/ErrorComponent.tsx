import { Box, Typography } from "@mui/material";
import C3PO from '../../public/C3PO.png';

const ErrorComponent = () => {
    return (
        <>
            <Box sx={{mt: 4, display: 'flex', flexDirection: "column", alignItems: "center"}}>
                <Typography sx={{ color: "#CCAA55", mb: 4 }}>C3PO Translates:</Typography>
                <Typography sx={{ color: "#222222;", mb: 6, textAlign: "center" }}>
                    I am sorry sir, but R2 says something
                    is not right here. I guess we should go back
                    the way we came. Or maybe ask locals for directions?
                </Typography>
                <img style={{width: "200px"}} src={C3PO} alt="" />
            </Box>
        </>
    );
}

export default ErrorComponent;