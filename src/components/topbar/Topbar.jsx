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
    { label: "Featured RAG Project", to: "/personal-projects/rag-ops-platform", anchor: null },
    { label: "Snowflake Finance Project", to: "/personal-projects/snowflake-finance-ai-command-center", anchor: null },
    { label: "AI Assistant", to: "/assistant", anchor: null },
    { label: "About Me", to: "/", anchor: "#aboutMe" },
    { label: "Skills", to: "/", anchor: "#skills" },
    { label: "Experience", to: "/", anchor: "#experience" },
    { label: "Education", to: "/", anchor: "#education" },
    { label: "Projects", to: "/", anchor: "#projects" },
    { label: "Data Science", to: "/data-science", anchor: null },
    { label: "Software Engineering", to: "/software-engineering", anchor: null },
    { label: "Personal Projects", to: "/personal-projects", anchor: null },
    { label: "Fitness Log", to: "/fitness-log", anchor: null },
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
                bgcolor: darkMode ? 'rgba(12, 20, 36, 0.74)' : 'rgba(255, 255, 255, 0.72)',
                color: darkMode ? 'grey.100' : 'grey.900',
                borderBottom: darkMode ? '1px solid rgba(148, 163, 184, 0.24)' : '1px solid rgba(148, 163, 184, 0.28)',
                backdropFilter: 'blur(14px) saturate(145%)',
                boxShadow: darkMode ? '0 10px 24px rgba(2, 6, 23, 0.45)' : '0 10px 24px rgba(15, 23, 42, 0.1)',
                position: 'fixed',
                zIndex: 1300,
            }}>
            <Box className="wrapper" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 1.2, md: 3 }, py: 1.1 }}>

                {/* Hamburger menu button */}
                <IconButton
                    onClick={() => setDrawerOpen(true)}
                    size="small"
                    sx={{
                        flexShrink: 0,
                        color: darkMode ? 'grey.100' : 'grey.900',
                        bgcolor: darkMode ? 'rgba(148, 163, 184, 0.13)' : 'rgba(15, 23, 42, 0.06)',
                        border: darkMode ? '1px solid rgba(148, 163, 184, 0.22)' : '1px solid rgba(15, 23, 42, 0.08)',
                        '&:hover': {
                            bgcolor: darkMode ? 'rgba(148, 163, 184, 0.22)' : 'rgba(15, 23, 42, 0.12)',
                        },
                    }}
                    aria-label="Open navigation menu"
                >
                    <MenuIcon />
                </IconButton>

                {/* Center content */}
                <Stack
                    direction="row"
                    spacing={{ xs: 1, md: 3 }}
                    alignItems="center"
                    sx={{
                        flex: 1,
                        justifyContent: 'center',
                        borderRadius: 999,
                        px: { xs: 0.8, md: 1.2 },
                        py: 0.45,
                        mx: 1,
                        bgcolor: darkMode ? 'rgba(30, 41, 59, 0.45)' : 'rgba(248, 250, 252, 0.74)',
                        border: darkMode ? '1px solid rgba(148, 163, 184, 0.16)' : '1px solid rgba(148, 163, 184, 0.24)',
                    }}
                >
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
                            <IconButton href="https://www.linkedin.com/in/arie-dekraker/" target="_blank" rel="noopener" size="small" sx={{ '&:hover': { transform: 'translateY(-1px)' } }}>
                                <img src="assets/linkedin.png" alt="LinkedIn" style={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="GitHub" arrow>
                            <IconButton href="https://github.com/HaveACigar" target="_blank" rel="noopener" size="small" sx={{ '&:hover': { transform: 'translateY(-1px)' } }}>
                                <img src="assets/github.png" alt="GitHub" style={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>

                {/* Dark mode toggle */}
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        bgcolor: darkMode ? 'rgba(30, 41, 59, 0.84)' : 'rgba(241, 245, 249, 0.9)',
                        border: darkMode ? '1px solid rgba(148, 163, 184, 0.28)' : '1px solid rgba(148, 163, 184, 0.34)',
                        flexShrink: 0,
                        '&:hover': {
                            bgcolor: darkMode ? 'rgba(51, 65, 85, 0.9)' : 'rgba(226, 232, 240, 0.92)',
                        },
                    }}
                >
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
                        bgcolor: darkMode ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.95)",
                        color: darkMode ? "#f5f5f5" : "#222",
                        backdropFilter: "blur(14px)",
                        borderRight: darkMode ? "1px solid rgba(148, 163, 184, 0.24)" : "1px solid rgba(148, 163, 184, 0.22)",
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
