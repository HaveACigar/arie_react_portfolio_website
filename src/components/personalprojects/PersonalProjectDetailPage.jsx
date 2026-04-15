import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box, Typography, Paper, Chip, Button, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ScienceIcon from "@mui/icons-material/Science";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

export default function PersonalProjectDetailPage() {
  const { projectId } = useParams();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const project = personalProjects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <Box sx={{ minHeight: "100vh", pt: 12, px: 3, color: darkMode ? "#f5f5f5" : "#222" }}>
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Project not found
          </Typography>
          <Button component={Link} to="/personal-projects" variant="contained" sx={{ textTransform: "none" }}>
            Back to Personal Projects
          </Button>
        </Box>
      </Box>
    );
  }

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
        <Button
          component={Link}
          to="/personal-projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Personal Projects
        </Button>

        <Box sx={{ textAlign: "center", mb: 5 }}>
          <ScienceIcon sx={{ fontSize: 48, color: accent, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            {project.title}
          </Typography>
          <Typography variant="h6" sx={{ color: accent, fontWeight: 600, mb: 2 }}>
            {project.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 760, mx: "auto", color: darkMode ? "#bbb" : "#555", lineHeight: 1.7 }}
          >
            {project.description}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            {project.github && (
              <Button
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<GitHubIcon />}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                View on GitHub
              </Button>
            )}
            <Chip
              label={project.status}
              sx={{
                fontWeight: 700,
                bgcolor: darkMode ? "#1f2937" : "#e8f0fe",
                color: darkMode ? "#93c5fd" : "#1d4ed8",
                border: darkMode ? "1px solid #334155" : "1px solid #bfdbfe",
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 5, borderColor: darkMode ? "#444" : "#e0e0e0" }} />

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Tech Stack
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
          {project.tech.map((item) => (
            <Chip
              key={item}
              label={item}
              sx={{
                fontWeight: 600,
                bgcolor: darkMode ? "#333" : "#e3f2fd",
                color: darkMode ? "#90caf9" : "#1565c0",
                border: darkMode ? "1px solid #555" : "1px solid #bbdefb",
              }}
            />
          ))}
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Skills Showcased
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
          {project.skillsShowcased.map((item) => (
            <Chip
              key={item}
              label={item}
              sx={{
                fontWeight: 600,
                bgcolor: darkMode ? "#1b5e20" : "#e8f5e9",
                color: darkMode ? "#81c784" : "#2e7d32",
                border: darkMode ? "1px solid #388e3c" : "1px solid #a5d6a7",
              }}
            />
          ))}
        </Box>

        {project.highlights && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Project Scope
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              {project.highlights.map((item, index) => (
                <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < project.highlights.length - 1 ? 1.5 : 0 }}>
                  <CheckCircleIcon sx={{ color: accent, fontSize: 20, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}

        {project.recruiterSignals && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Recruiter Signal
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              {project.recruiterSignals.map((item, index) => (
                <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < project.recruiterSignals.length - 1 ? 1.5 : 0 }}>
                  <Typography variant="body2" sx={{ color: accent, fontWeight: 700, minWidth: 24 }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}

        {project.deliverables && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Planned Deliverables
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              {project.deliverables.map((item, index) => (
                <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < project.deliverables.length - 1 ? 1.5 : 0 }}>
                  <Typography variant="body2" sx={{ color: accent, fontWeight: 700, minWidth: 24 }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}