import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Paper, Chip, Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ScienceIcon from "@mui/icons-material/Science";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

/**
 * PersonalProjects — Landing page listing all self-directed Data Science
 * portfolio projects. Each card links to a dedicated detail page and
 * optionally to the GitHub repository.
 *
 * Route: /personal-projects
 */
export default function PersonalProjects() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Box
      className="personal-projects-page"
      sx={{
        minHeight: "100vh",
        pt: 10,
        pb: 6,
        px: { xs: 2, md: 6 },
        color: darkMode ? "#f5f5f5" : "#222",
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* Back navigation */}
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Home
        </Button>

        {/* Page header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <ScienceIcon
            sx={{
              fontSize: 48,
              color: darkMode ? "#90caf9" : "#1976d2",
              mb: 1,
            }}
          />
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, mb: 1 }}
          >
            My Personal Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 750,
              mx: "auto",
              color: darkMode ? "#bbb" : "#555",
              lineHeight: 1.7,
            }}
          >
            Independent projects designed to showcase each skillset vital to a
            Data Scientist — from data wrangling and statistical analysis to
            machine learning, NLP, and MLOps.
          </Typography>
        </Box>

        {/* Project cards grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {personalProjects.map((project) => (
            <Paper
              key={project.id}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                background: darkMode ? "#2a2a2a" : "#fff",
                border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
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
              {/* Title & status */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: darkMode ? "#e0e0e0" : "#222", flex: 1 }}
                >
                  {project.title}
                </Typography>
                <Chip
                  label={project.status}
                  size="small"
                  sx={{
                    ml: 1, fontWeight: 600, fontSize: "0.7rem",
                    bgcolor: project.status === "Complete"
                      ? (darkMode ? "#0d47a1" : "#e3f2fd")
                      : (darkMode ? "#1b5e20" : "#e8f5e9"),
                    color: project.status === "Complete"
                      ? (darkMode ? "#90caf9" : "#1565c0")
                      : (darkMode ? "#81c784" : "#2e7d32"),
                  }}
                />
              </Box>

              {/* Subtitle */}
              <Typography
                variant="subtitle2"
                sx={{ color: darkMode ? "#90caf9" : "#1976d2", fontWeight: 600, mb: 1 }}
              >
                {project.subtitle}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{ color: darkMode ? "#bbb" : "#555", mb: 2, lineHeight: 1.6, flex: 1 }}
              >
                {project.description}
              </Typography>

              {/* Tech chips */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
                {project.tech.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      fontWeight: 500, fontSize: "0.7rem",
                      bgcolor: darkMode ? "#333" : "#f3e5f5",
                      color: darkMode ? "#ce93d8" : "#7b1fa2",
                      border: darkMode ? "1px solid #9c27b0" : "1px solid #ce93d8",
                    }}
                  />
                ))}
              </Box>

              {/* Action buttons */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Button
                  component={Link}
                  to={project.route}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  View Details →
                </Button>
                {project.github && (
                  <Button
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    startIcon={<GitHubIcon />}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    GitHub
                  </Button>
                )}
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Coming soon placeholder for future projects */}
        {personalProjects.length < 10 && (
          <Box sx={{ textAlign: "center", mt: 6, color: darkMode ? "#666" : "#aaa" }}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              More projects coming soon — supervised ML, NLP, deep learning, time series, and more.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
