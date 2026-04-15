import "./topbar.scss";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// Navigation links shown in the hamburger menu
const NAV_LINKS = [
    { label: "Home", to: "/", anchor: null },
    { label: "About Me", to: "/", anchor: "#aboutMe" },
    { label: "Skills", to: "/", anchor: "#skills" },
    { label: "Experience", to: "/", anchor: "#experience" },
    { label: "Projects", to: "/", anchor: "#projects" },
    { label: "Education", to: "/", anchor: "#education" },
    { label: "Data Science", to: "/data-science", anchor: null },
    { label: "Software Engineering", to: "/software-engineering", anchor: null },
    { label: "Personal Projects", to: "/personal-projects", anchor: null },
    { label: "Portfolio & Works", to: "/portfolio", anchor: null },
    { label: "Contact", to: "/contact", anchor: null },
];

export default function Topbar() {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClick = () => {
        theme.dispatch({ type: "TOGGLE" });
    };

    const handleNavClick = (link) => {
        setDrawerOpen(false);
        // If the link targets an anchor on the homepage and we're already on /,
        // scroll to it. Otherwise React Router will navigate first.
        if (link.anchor && location.pathname === "/") {
            setTimeout(() => {
                const el = document.querySelector(link.anchor);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    return (
        <Box className="topbar"
            sx={{
                width: '100%',
                bgcolor: darkMode ? 'grey.900' : 'grey.100',
                color: darkMode ? 'grey.100' : 'grey.900',
                boxShadow: 2,
                position: 'fixed',
                zIndex: 1300,
            }}>
            <Box className="wrapper" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 1, md: 2 }, py: 1 }}>

                {/* Hamburger menu button */}
                <IconButton
                    onClick={() => setDrawerOpen(true)}
                    size="small"
                    sx={{ flexShrink: 0, color: darkMode ? 'grey.100' : 'grey.900' }}
                    aria-label="Open navigation menu"
                >
                    <MenuIcon />
                </IconButton>

                {/* Center content */}
                <Stack direction="row" spacing={{ xs: 1, md: 3 }} alignItems="center" sx={{ flex: 1, justifyContent: 'center' }}>
                    <Stack direction="row" spacing={1} alignItems="center" className="itemContainer" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <PersonIcon fontSize="small" />
                        <Typography variant="body2" noWrap>+1(734)945-3869</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" className="itemContainer" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <MailIcon fontSize="small" />
                        <Typography variant="body2" noWrap>ariedekraker@gmail.com</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0} alignItems="center">
                        <Tooltip title="LinkedIn" arrow>
                            <IconButton href="https://www.linkedin.com/in/arie-dekraker/" target="_blank" rel="noopener" size="small">
                                <img src="assets/linkedin.png" alt="LinkedIn" style={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="GitHub" arrow>
                            <IconButton href="https://github.com/HaveACigar" target="_blank" rel="noopener" size="small">
                                <img src="assets/github.png" alt="GitHub" style={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="HackerRank" arrow>
                            <IconButton href="https://www.hackerrank.com/ariedekraker" target="_blank" rel="noopener" size="small">
                                <img src="assets/hackerrank.png" alt="HackerRank" style={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>

                {/* Dark mode toggle */}
                <IconButton onClick={handleClick} size="small" sx={{ bgcolor: darkMode ? 'grey.800' : 'grey.200', flexShrink: 0 }}>
                    <img src={darkMode ? "assets/sun_icon.png" : "assets/moon_icon.png"} alt="toggleIcon" style={{ width: 22, height: 22 }} />
                </IconButton>
            </Box>

            {/* Navigation drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: 260,
                        bgcolor: darkMode ? "#1a1a1a" : "#fff",
                        color: darkMode ? "#f5f5f5" : "#222",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, py: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Navigate
                    </Typography>
                    <IconButton onClick={() => setDrawerOpen(false)} size="small">
                        <CloseIcon sx={{ color: darkMode ? "#f5f5f5" : "#222" }} />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: darkMode ? "#333" : "#e0e0e0" }} />
                <List>
                    {NAV_LINKS.map((link) => (
                        <ListItemButton
                            key={link.label}
                            component={Link}
                            to={link.anchor ? `/${link.anchor}` : link.to}
                            onClick={() => handleNavClick(link)}
                            sx={{
                                "&:hover": {
                                    bgcolor: darkMode ? "#333" : "#e3f2fd",
                                },
                            }}
                        >
                            <ListItemText
                                primary={link.label}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
