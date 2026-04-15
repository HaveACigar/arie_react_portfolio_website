import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SchoolIcon from "@mui/icons-material/School";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "../../context";
import { projects, personalProjects } from "../../data";
import "./projects.scss";

export default function Projects() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const accent = darkMode ? "#90caf9" : "#1976d2";
  const cardBg = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";

  return (
    <Box
      className="projects-section"
      id="projects"
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
      }}
    >
      {/* ── Section 1: School Projects ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
        <SchoolIcon sx={{ fontSize: 32, color: accent }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: accent, letterSpacing: 1 }}
        >
          My School Projects
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
          mb: 8,
        }}
      >
        {projects.map((project) => (
          <Paper
            key={project.id}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              background: cardBg,
              border: cardBorder,
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 8px 24px rgba(144,202,249,0.12)"
                  : "0 8px 24px rgba(25,118,210,0.12)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#e0e0e0" : "#222", flex: 1, lineHeight: 1.3 }}>
                {project.title}
              </Typography>
              <Chip
                label={project.status}
                size="small"
                sx={{
                  ml: 1, fontWeight: 600, fontSize: "0.7rem",
                  bgcolor: project.status === "Ongoing" ? (darkMode ? "#1b5e20" : "#e8f5e9") : (darkMode ? "#0d47a1" : "#e3f2fd"),
                  color: project.status === "Ongoing" ? (darkMode ? "#81c784" : "#2e7d32") : (darkMode ? "#90caf9" : "#1565c0"),
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 2, lineHeight: 1.6, flex: 1 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
              {project.tech.map((t) => (
                <Chip key={t} label={t} size="small" sx={{ fontWeight: 500, fontSize: "0.7rem", bgcolor: darkMode ? "#333" : "#f3e5f5", color: darkMode ? "#ce93d8" : "#7b1fa2", border: darkMode ? "1px solid #9c27b0" : "1px solid #ce93d8" }} />
              ))}
            </Box>
            {project.link && (
              <Button href={project.link} target="_blank" rel="noopener noreferrer" size="small" endIcon={<OpenInNewIcon />} sx={{ alignSelf: "flex-start", textTransform: "none", fontWeight: 600, color: accent }}>
                View Project
              </Button>
            )}
          </Paper>
        ))}
      </Box>

      {/* ── Section 2: Personal Projects ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
        <RocketLaunchIcon sx={{ fontSize: 32, color: accent }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: accent, letterSpacing: 1 }}
        >
          My Personal Projects
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
          mb: 3,
        }}
      >
        {personalProjects.map((project) => (
          <Paper
            key={project.id}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              background: cardBg,
              border: cardBorder,
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 8px 24px rgba(144,202,249,0.12)"
                  : "0 8px 24px rgba(25,118,210,0.12)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#e0e0e0" : "#222", flex: 1, lineHeight: 1.3 }}>
                {project.title}
              </Typography>
              <Chip
                label={project.status}
                size="small"
                sx={{
                  ml: 1, fontWeight: 600, fontSize: "0.7rem",
                  bgcolor: project.status === "Complete" ? (darkMode ? "#0d47a1" : "#e3f2fd") : (darkMode ? "#1b5e20" : "#e8f5e9"),
                  color: project.status === "Complete" ? (darkMode ? "#90caf9" : "#1565c0") : (darkMode ? "#81c784" : "#2e7d32"),
                }}
              />
            </Box>
            <Typography variant="subtitle2" sx={{ color: accent, fontWeight: 600, mb: 1 }}>
              {project.subtitle}
            </Typography>
            <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 2, lineHeight: 1.6, flex: 1 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
              {project.tech.map((t) => (
                <Chip key={t} label={t} size="small" sx={{ fontWeight: 500, fontSize: "0.7rem", bgcolor: darkMode ? "#333" : "#f3e5f5", color: darkMode ? "#ce93d8" : "#7b1fa2", border: darkMode ? "1px solid #9c27b0" : "1px solid #ce93d8" }} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button component={Link} to={project.route} size="small" variant="outlined" sx={{ textTransform: "none", fontWeight: 600 }}>
                View Details →
              </Button>
              {project.github && (
                <Button href={project.github} target="_blank" rel="noopener noreferrer" size="small" startIcon={<GitHubIcon />} sx={{ textTransform: "none", fontWeight: 600 }}>
                  GitHub
                </Button>
              )}
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Link to full Personal Projects page */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          component={Link}
          to="/personal-projects"
          variant="outlined"
          sx={{ textTransform: "none", fontWeight: 600, px: 4 }}
        >
          View All Personal Projects →
        </Button>
      </Box>
    </Box>
  );
}
