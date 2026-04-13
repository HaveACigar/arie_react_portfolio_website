import { useContext } from "react";
import { Box, Typography, Button, Chip, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ScienceIcon from "@mui/icons-material/Science";
import { ThemeContext } from "../../context";
import { projects, skills, education } from "../../data";
import Experience from "../experience/Experience";
import "./specialtyPage.scss";

const DS_SKILL_CATEGORIES = [
  "Programming",
  "AI & Machine Learning",
  "LLM & Quantitative",
  "Data Visualization",
];

export default function DataSciencePage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const dsSkills = skills.filter((s) => DS_SKILL_CATEGORIES.includes(s.category));
  const dsProjects = projects.filter(
    (p) => p.category === "data-science" || p.category === "both"
  );

  return (
    <Box
      className="specialty-page"
      sx={{
        minHeight: "100vh",
        pt: 10,
        pb: 6,
        px: { xs: 2, md: 6 },
        color: darkMode ? "#f5f5f5" : "#222",
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Header */}
        <Button
          href="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Home
        </Button>

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
            sx={{
              fontWeight: 800,
              color: darkMode ? "#f5f5f5" : "#222",
              mb: 1,
            }}
          >
            Data Science & Analysis
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 700,
              mx: "auto",
              color: darkMode ? "#bbb" : "#555",
              lineHeight: 1.7,
            }}
          >
            My data science journey spans from predictive Deep Learning models at
            Ford Motor Company to academic projects analyzing economic disparities
            and climate patterns. I specialize in MLOps, A/B testing, and
            translating complex business challenges into end-to-end data solutions.
          </Typography>
        </Box>

        {/* Relevant Skills */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#90caf9" : "#1976d2",
            mb: 3,
            textAlign: "center",
          }}
        >
          Core Skills
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 6,
          }}
        >
          {dsSkills.map((group) => (
            <Paper
              key={group.category}
              elevation={2}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: darkMode ? "#2a2a2a" : "#fff",
                border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#90caf9" : "#1976d2",
                  mb: 1,
                }}
              >
                {group.category}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                {group.items.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      bgcolor: darkMode ? "#333" : "#e3f2fd",
                      color: darkMode ? "#e0e0e0" : "#1565c0",
                      border: darkMode ? "1px solid #555" : "1px solid #bbdefb",
                    }}
                  />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Experience filtered to data-science */}
        <Experience filter="data-science" />

        {/* Education */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#90caf9" : "#1976d2",
            mb: 3,
            mt: 2,
            textAlign: "center",
          }}
        >
          Education
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 6 }}>
          {education.map((edu) => (
            <Paper
              key={edu.id}
              elevation={2}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: darkMode ? "#2a2a2a" : "#fff",
                border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#e0e0e0" : "#222" }}>
                {edu.degree}
              </Typography>
              {edu.specialization && (
                <Typography variant="body2" sx={{ color: darkMode ? "#90caf9" : "#1976d2", fontWeight: 600 }}>
                  {edu.specialization} specialization{edu.gpa ? ` · ${edu.gpa} GPA` : ""}
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: darkMode ? "#aaa" : "#666", fontStyle: "italic" }}>
                {edu.school}, {edu.location} · {edu.period}
              </Typography>
              {edu.coursework && edu.coursework.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mt: 1 }}>
                  {edu.coursework.map((c) => (
                    <Chip key={c} label={c} size="small" sx={{ fontSize: "0.72rem", bgcolor: darkMode ? "#333" : "#fff3e0", color: darkMode ? "#ffb74d" : "#e65100", border: darkMode ? "1px solid #ff9800" : "1px solid #ffcc80" }} />
                  ))}
                </Box>
              )}
            </Paper>
          ))}
        </Box>

        {/* Projects filtered to data-science */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#90caf9" : "#1976d2",
            mb: 3,
            textAlign: "center",
          }}
        >
          Projects
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 4,
          }}
        >
          {dsProjects.map((project) => (
            <Paper
              key={project.id}
              elevation={2}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: darkMode ? "#2a2a2a" : "#fff",
                border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-3px)" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#e0e0e0" : "#222", flex: 1 }}>
                  {project.title}
                </Typography>
                <Chip label={project.status} size="small" sx={{ ml: 1, fontWeight: 600, fontSize: "0.7rem", bgcolor: project.status === "Ongoing" ? (darkMode ? "#1b5e20" : "#e8f5e9") : (darkMode ? "#0d47a1" : "#e3f2fd"), color: project.status === "Ongoing" ? (darkMode ? "#81c784" : "#2e7d32") : (darkMode ? "#90caf9" : "#1565c0") }} />
              </Box>
              <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 1.5, flex: 1 }}>
                {project.description}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                {project.tech.map((t) => (
                  <Chip key={t} label={t} size="small" sx={{ fontSize: "0.7rem", bgcolor: darkMode ? "#333" : "#f3e5f5", color: darkMode ? "#ce93d8" : "#7b1fa2", border: darkMode ? "1px solid #9c27b0" : "1px solid #ce93d8" }} />
                ))}
              </Box>
              {project.link && (
                <Button href={project.link} target="_blank" rel="noopener noreferrer" size="small" sx={{ alignSelf: "flex-start", textTransform: "none", fontWeight: 600 }}>
                  View Project →
                </Button>
              )}
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
