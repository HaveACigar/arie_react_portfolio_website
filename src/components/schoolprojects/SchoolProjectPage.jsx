import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Paper, Chip, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SchoolIcon from "@mui/icons-material/School";
import { ThemeContext } from "../../context";
import { projects } from "../../data";

export default function SchoolProjectPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { projectSlug } = useParams();

  const project = projects.find((p) => p.slug === projectSlug);
  const accent = darkMode ? "#90caf9" : "#1976d2";
  const cardBg = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";

  if (!project) {
    return (
      <Box sx={{ minHeight: "100vh", pt: 12, px: 2, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Project Not Found
        </Typography>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
          Back to Home
        </Button>
      </Box>
    );
  }

  const resources =
    project.resources && project.resources.length > 0
      ? project.resources
      : project.link
      ? [{ title: "Primary Resource", type: "Link", url: project.link }]
      : [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: 10,
        pb: 6,
        px: { xs: 2, md: 6 },
        color: darkMode ? "#f5f5f5" : "#222",
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Home
        </Button>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <SchoolIcon sx={{ fontSize: 48, color: accent, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            {project.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 760, mx: "auto", color: darkMode ? "#bbb" : "#555", lineHeight: 1.7 }}
          >
            {project.description}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap", mb: 4 }}>
          <Chip label={project.status} sx={{ fontWeight: 600 }} />
          {project.tech.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: darkMode ? "#333" : "#f3e5f5",
                color: darkMode ? "#ce93d8" : "#7b1fa2",
                border: darkMode ? "1px solid #9c27b0" : "1px solid #ce93d8",
              }}
            />
          ))}
        </Box>

        <Divider sx={{ mb: 3, borderColor: darkMode ? "#444" : "#e0e0e0" }} />

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Project Resources
        </Typography>
        <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 2 }}>
          Scroll through project assets, reports, notebooks, and external websites used for this school project.
        </Typography>

        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 3,
            background: cardBg,
            border: cardBorder,
            maxHeight: 360,
            overflowY: "auto",
          }}
        >
          {resources.map((resource) => (
            <Paper
              key={`${project.slug}-${resource.title}`}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                mb: 1.5,
                background: darkMode ? "#1e1e1e" : "#f8fbff",
                border: darkMode ? "1px solid #393939" : "1px solid #dbeafe",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#aaa" : "#666" }}>
                    {resource.type}
                  </Typography>
                </Box>
                <Button
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewIcon />}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Open
                </Button>
              </Box>
            </Paper>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}