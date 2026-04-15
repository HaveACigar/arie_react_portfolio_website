import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Paper, Chip, Button, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Web";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MapIcon from "@mui/icons-material/Map";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

/**
 * ReactPortfolioPage — Detailed page for the React Portfolio Website project.
 *
 * Showcases the technical makeup of the portfolio site itself: architecture,
 * routing, component structure, deployment pipeline, and page map.
 * The pageMakeup array in data.js should be updated whenever noteworthy
 * structural changes are made to the website.
 *
 * Route: /personal-projects/react-portfolio-website
 */
export default function ReactPortfolioPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const project = personalProjects.find(
    (p) => p.id === "react-portfolio-website"
  );

  const accent = darkMode ? "#90caf9" : "#1976d2";
  const cardBg = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";

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
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Navigation */}
        <Button
          component={Link}
          to="/personal-projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Personal Projects
        </Button>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <WebIcon sx={{ fontSize: 48, color: accent, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            {project.title}
          </Typography>
          <Typography variant="h6" sx={{ color: accent, fontWeight: 600, mb: 2 }}>
            {project.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 750, mx: "auto", color: darkMode ? "#bbb" : "#555", lineHeight: 1.7 }}
          >
            {project.description}
          </Typography>

          {/* CTA buttons */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<OpenInNewIcon />}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Visit Live Site
            </Button>
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              View on GitHub
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 5, borderColor: darkMode ? "#444" : "#e0e0e0" }} />

        {/* Tech Stack */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Tech Stack
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
          {project.tech.map((t) => (
            <Chip
              key={t}
              label={t}
              sx={{
                fontWeight: 600,
                bgcolor: darkMode ? "#333" : "#e3f2fd",
                color: darkMode ? "#90caf9" : "#1565c0",
                border: darkMode ? "1px solid #555" : "1px solid #bbdefb",
              }}
            />
          ))}
        </Box>

        {/* Skills Showcased */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Skills Showcased
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
          {project.skillsShowcased.map((s) => (
            <Chip
              key={s}
              label={s}
              sx={{
                fontWeight: 600,
                bgcolor: darkMode ? "#1b5e20" : "#e8f5e9",
                color: darkMode ? "#81c784" : "#2e7d32",
                border: darkMode ? "1px solid #388e3c" : "1px solid #a5d6a7",
              }}
            />
          ))}
        </Box>

        {/* Key Highlights */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Key Highlights
        </Typography>
        <Paper
          elevation={2}
          sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}
        >
          {project.highlights.map((h, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: i < project.highlights.length - 1 ? 1.5 : 0 }}>
              <CheckCircleIcon sx={{ color: accent, fontSize: 20, mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                {h}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Page Makeup / Site Map */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <MapIcon sx={{ fontSize: 28, color: accent }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: accent }}>
            Page Makeup
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 2 }}>
          Every route in the application and what it renders:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 5 }}>
          {project.pageMakeup.map((entry, i) => {
            const dashIndex = entry.indexOf(" — ");
            const route = dashIndex !== -1 ? entry.slice(0, dashIndex) : entry;
            const desc = dashIndex !== -1 ? entry.slice(dashIndex + 3) : "";
            return (
              <Paper
                key={i}
                elevation={1}
                sx={{ p: 2, borderRadius: 2, background: cardBg, border: cardBorder }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "monospace",
                    color: accent,
                    fontSize: "0.85rem",
                  }}
                >
                  {route}
                </Typography>
                {desc && (
                  <Typography variant="body2" sx={{ color: darkMode ? "#aaa" : "#666", mt: 0.5 }}>
                    {desc}
                  </Typography>
                )}
              </Paper>
            );
          })}
        </Box>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: "center", mt: 4, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
          <Button
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<OpenInNewIcon />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Visit Live Site
          </Button>
          <Button
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="large"
            startIcon={<GitHubIcon />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Explore the Repository
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
