import { useContext } from "react";
import { Box, Typography, Button, Chip, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CodeIcon from "@mui/icons-material/Code";
import { ThemeContext } from "../../context";
import { experience, projects, skills, education } from "../../data";
import Experience from "../experience/Experience";
import "./specialtyPage.scss";

const SWE_SKILL_CATEGORIES = [
  "Programming",
  "MLOps & Cloud",
  "Databases",
];

export default function SoftwareEngineeringPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const sweSkills = skills.filter((s) => SWE_SKILL_CATEGORIES.includes(s.category));
  const sweProjects = projects.filter(
    (p) => p.category === "software-engineering" || p.category === "both"
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
          <CodeIcon
            sx={{
              fontSize: 48,
              color: darkMode ? "#81c784" : "#2e7d32",
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
            Backend Software Engineering
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
            Over 4 years as a Software Engineer at Ford Motor Company, I built
            and scaled high-availability backend services powering the FordPass
            and LincolnWay mobile applications. My work spanned RESTful API
            engineering, real-time streaming with Kafka, CI/CD pipelines, and
            Site Reliability Engineering practices.
          </Typography>
        </Box>

        {/* Relevant Skills */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#81c784" : "#2e7d32",
            mb: 3,
            textAlign: "center",
          }}
        >
          Core Skills
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 2,
            mb: 6,
          }}
        >
          {sweSkills.map((group) => (
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
                  color: darkMode ? "#81c784" : "#2e7d32",
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
                      bgcolor: darkMode ? "#333" : "#e8f5e9",
                      color: darkMode ? "#e0e0e0" : "#2e7d32",
                      border: darkMode ? "1px solid #555" : "1px solid #a5d6a7",
                    }}
                  />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Experience filtered to software-engineering */}
        <Experience filter="software-engineering" />

        {/* Education */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#81c784" : "#2e7d32",
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
                <Typography variant="body2" sx={{ color: darkMode ? "#81c784" : "#2e7d32", fontWeight: 600 }}>
                  {edu.specialization} specialization{edu.gpa ? ` · ${edu.gpa} GPA` : ""}
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: darkMode ? "#aaa" : "#666", fontStyle: "italic" }}>
                {edu.school}, {edu.location} · {edu.period}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Projects */}
        {sweProjects.length > 0 && (
          <>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: darkMode ? "#81c784" : "#2e7d32",
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
              {sweProjects.map((project) => (
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
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#e0e0e0" : "#222", mb: 0.5 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 1.5, flex: 1 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                    {project.tech.map((t) => (
                      <Chip key={t} label={t} size="small" sx={{ fontSize: "0.7rem", bgcolor: darkMode ? "#333" : "#e8f5e9", color: darkMode ? "#81c784" : "#2e7d32", border: darkMode ? "1px solid #4caf50" : "1px solid #a5d6a7" }} />
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
          </>
        )}

        {/* Key Highlights */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#81c784" : "#2e7d32",
            mb: 3,
            textAlign: "center",
          }}
        >
          Key Highlights
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1.5, md: 3 },
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "20M+ Requests/mo", desc: "API throughput" },
            { label: "99.999% Uptime", desc: "Production reliability" },
            { label: "4+ Years", desc: "Backend engineering" },
            { label: "Agile / XP", desc: "Development methodology" },
          ].map((m) => (
            <Box
              key={m.label}
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#2a2a2a" : "#f5f7fa",
                border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
                minWidth: 130,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#81c784" : "#2e7d32",
                  fontSize: "1.1rem",
                }}
              >
                {m.label}
              </Typography>
              <Typography variant="caption" sx={{ color: darkMode ? "#999" : "#888" }}>
                {m.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
