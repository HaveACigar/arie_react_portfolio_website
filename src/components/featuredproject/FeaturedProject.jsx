import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";

export default function FeaturedProject() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const project = personalProjects.find((item) => item.id === "rag-ops-platform");

  if (!project) {
    return null;
  }

  const accent = darkMode ? "#90caf9" : "#1976d2";
  const cardBorder = darkMode ? "1px solid #3f4d63" : "1px solid #d6e7ff";

  return (
    <Box
      id="featured-project"
      sx={{
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, md: 6 },
        mt: { xs: 2, md: 3 },
        mb: { xs: 4, md: 6 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: darkMode
            ? "linear-gradient(145deg, rgba(19,31,45,0.96) 0%, rgba(35,35,35,0.98) 100%)"
            : "linear-gradient(145deg, rgba(235,244,255,0.98) 0%, rgba(255,255,255,0.98) 100%)",
          border: cardBorder,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -20,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: darkMode
              ? "radial-gradient(circle, rgba(144,202,249,0.20) 0%, rgba(144,202,249,0) 72%)"
              : "radial-gradient(circle, rgba(25,118,210,0.14) 0%, rgba(25,118,210,0) 72%)",
            pointerEvents: "none",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <AutoAwesomeIcon sx={{ color: accent }} />
            <Typography
              variant="overline"
              sx={{
                color: accent,
                fontWeight: 800,
                letterSpacing: 1.4,
              }}
            >
              Featured AI Project
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              lineHeight: 1.15,
              color: darkMode ? "#f5f5f5" : "#0f172a",
              mb: 1,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: accent,
              fontWeight: 700,
              mb: 2,
            }}
          >
            {project.subtitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 860,
              color: darkMode ? "#cbd5e1" : "#475569",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2.5 }}>
            {project.tech.slice(0, 6).map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                sx={{
                  fontWeight: 700,
                  bgcolor: darkMode ? "rgba(51, 65, 85, 0.85)" : "#e8f1ff",
                  color: darkMode ? "#bfdbfe" : "#1d4ed8",
                  border: darkMode ? "1px solid #475569" : "1px solid #bfdbfe",
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.25, mb: 3 }}>
            {project.highlights.slice(0, 4).map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{ color: darkMode ? "#d4d4d8" : "#334155", lineHeight: 1.6 }}
              >
                {"• "}{item}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            <Button
              component={Link}
              to={project.route}
              variant="contained"
              sx={{ textTransform: "none", fontWeight: 700, px: 2.25 }}
            >
              View Project Details
            </Button>
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", fontWeight: 700, px: 2.25 }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}