import "./topbar.scss";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from "react";
import { ThemeContext } from "../../context";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function Topbar({ menuOpen, setMenuOpen }) {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const handleClick = () => {
        theme.dispatch({ type: "TOGGLE" });
    };


    return (
        <Box className={"topbar " + (menuOpen && "active")}
            sx={{
                width: '100%',
                bgcolor: darkMode ? 'grey.900' : 'grey.100',
                color: darkMode ? 'grey.100' : 'grey.900',
                boxShadow: 2,
                position: 'fixed',
                zIndex: 1300,
            }}>
            <Box className="wrapper" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 1 }}>
                <Stack direction="row" spacing={3} alignItems="center" className="left" sx={{ flex: 1, justifyContent: 'center' }}>
                    <Stack direction="row" spacing={1} alignItems="center" className="itemContainer">
                        <PersonIcon fontSize="small" />
                        <Typography variant="body2">+1(734)945-3869</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" className="itemContainer">
                        <MailIcon fontSize="small" />
                        <Typography variant="body2">ariedekraker@gmail.com</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" className="imageLinks">
                        <Tooltip title="LinkedIn" arrow>
                            <IconButton href="https://www.linkedin.com/in/arie-dekraker/" target="_blank" rel="noopener">
                                <img src="assets/linkedin.png" alt="LinkedIn" style={{ width: 28, height: 28 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="GitHub" arrow>
                            <IconButton href="https://github.com/HaveACigar" target="_blank" rel="noopener">
                                <img src="assets/github.png" alt="GitHub" style={{ width: 28, height: 28 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="HackerRank" arrow>
                            <IconButton href="https://www.hackerrank.com/ariedekraker" target="_blank" rel="noopener">
                                <img src="assets/hackerrank.png" alt="HackerRank" style={{ width: 28, height: 28 }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                    <IconButton onClick={handleClick} size="small" sx={{ bgcolor: darkMode ? 'grey.800' : 'grey.200' }}>
                        <img src={darkMode ? "assets/sun_icon.png" : "assets/moon_icon.png"} alt="toggleIcon" style={{ width: 24, height: 24 }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
