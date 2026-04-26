import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SchoolIcon from "@mui/icons-material/School";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ScienceIcon from "@mui/icons-material/Science";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "../../context";
import { projects, personalProjects } from "../../data";
import "./projects.scss";

export default function Projects() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const accent = darkMode ? "#90caf9" : "#1976d2";

  const PERSONAL_PRIORITY = ["rag-ops-platform", "arieai-assistant", "react-portfolio-website", "fitness-log-app"];
  const DATA_SCIENCE_PRIORITY = [
    "rag-ops-platform",
    "agentic-claims-communication-copilot",
    "snowflake-finance-ai-command-center",
    "eda-visualization-dashboard",
    "supervised-ml-pipeline",
    "nlp-text-analytics",
    "deep-learning-image-classifier",
    "time-series-forecasting",
    "recommendation-system",
    "ab-testing-statistical-inference",
    "sql-data-engineering-pipeline",
    "ml-model-deployment",
  ];

  const sortByPriority = (items, priority) => {
    return items.slice().sort((a, b) => {
      const aIndex = priority.indexOf(a.id);
      const bIndex = priority.indexOf(b.id);
      const aRank = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const bRank = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      if (aRank !== bRank) return aRank - bRank;
      return a.title.localeCompare(b.title);
    });
  };

  const personalOnlyProjects = sortByPriority(
    personalProjects.filter((project) => project.category !== "data-science" || project.id === "rag-ops-platform"),
    PERSONAL_PRIORITY,
  );
  const dataScienceProjects = sortByPriority(
    personalProjects.filter((project) => project.category === "data-science"),
    DATA_SCIENCE_PRIORITY,
  );

  const sectionBand = {
    personal: darkMode ? "linear-gradient(90deg,#22d3ee,#38bdf8)" : "linear-gradient(90deg,#06b6d4,#0ea5e9)",
    dataScience: darkMode ? "linear-gradient(90deg,#34d399,#10b981)" : "linear-gradient(90deg,#059669,#10b981)",
    school: darkMode ? "linear-gradient(90deg,#f59e0b,#f97316)" : "linear-gradient(90deg,#d97706,#ea580c)",
  };

  return (
    <Box
      className="projects-section modern-section"
      id="projects"
      sx={{
        py: { xs: 7, md: 8 },
        px: { xs: 2, md: 6 },
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
        borderRadius: 4,
        border: darkMode ? "1px solid rgba(148,163,184,0.24)" : "1px solid rgba(148,163,184,0.2)",
        bgcolor: darkMode ? "rgba(15,23,42,0.62)" : "rgba(255,255,255,0.74)",
        backdropFilter: "blur(10px)",
        boxShadow: darkMode ? "0 18px 40px rgba(2,6,23,0.38)" : "0 16px 34px rgba(15,23,42,0.1)",
      }}
    >
      <Typography
        variant="overline"
        align="center"
        sx={{
          display: "block",
          letterSpacing: 2,
          fontWeight: 700,
          color: darkMode ? "#fcd34d" : "#b45309",
          mb: 0.8,
        }}
      >
        Portfolio
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.2, flexWrap: "wrap", mb: 3 }}>
        <Button href="/data-science" variant="outlined" sx={{ textTransform: "none", fontWeight: 700 }}>
          Data Science & Analytics Page
        </Button>
        <Button href="/software-engineering" variant="outlined" sx={{ textTransform: "none", fontWeight: 700 }}>
          Software Engineering Page
        </Button>
      </Box>
      {/* ── Section 1: Personal Projects ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
        <RocketLaunchIcon sx={{ fontSize: 32, color: accent }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: darkMode ? "#e2e8f0" : "#0f172a", letterSpacing: -0.3 }}
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
          mb: 8,
        }}
      >
        {personalOnlyProjects.map((project, index) => (
          <Paper
            key={project.id}
            elevation={3}
            sx={{
              position: "relative",
              overflow: "hidden",
              animation: "staggerFade 520ms ease forwards",
              animationDelay: `${index * 75}ms`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: sectionBand.personal,
              },
              p: 3,
              borderRadius: 3.5,
              background: darkMode ? "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))" : "linear-gradient(145deg, rgba(248,250,252,0.94), rgba(240,249,255,0.85))",
              border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(125,211,252,0.28)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 12px 24px rgba(2,6,23,0.34)"
                  : "0 12px 24px rgba(14,116,144,0.16)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#f1f5f9" : "#0f172a", flex: 1, lineHeight: 1.3 }}>
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
            <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#334155", mb: 2, lineHeight: 1.6, flex: 1 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
              {project.tech.map((t) => (
                <Chip key={t} label={t} size="small" sx={{ fontWeight: 500, fontSize: "0.7rem", bgcolor: darkMode ? "rgba(124,58,237,0.22)" : "rgba(243,232,255,0.85)", color: darkMode ? "#ddd6fe" : "#5b21b6", border: darkMode ? "1px solid rgba(167,139,250,0.38)" : "1px solid rgba(167,139,250,0.28)" }} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
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

      {/* ── Section 2: Data Science Projects ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
        <ScienceIcon sx={{ fontSize: 32, color: accent }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: darkMode ? "#e2e8f0" : "#0f172a", letterSpacing: -0.3 }}
        >
          My Data Science Projects
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
        {dataScienceProjects.map((project, index) => (
          <Paper
            key={project.id}
            elevation={3}
            sx={{
              position: "relative",
              overflow: "hidden",
              animation: "staggerFade 520ms ease forwards",
              animationDelay: `${index * 75}ms`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: sectionBand.dataScience,
              },
              p: 3,
              borderRadius: 3.5,
              background: darkMode ? "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))" : "linear-gradient(145deg, rgba(248,250,252,0.94), rgba(240,249,255,0.85))",
              border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(125,211,252,0.28)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 12px 24px rgba(2,6,23,0.34)"
                  : "0 12px 24px rgba(14,116,144,0.16)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#f1f5f9" : "#0f172a", flex: 1, lineHeight: 1.3 }}>
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
            <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#334155", mb: 2, lineHeight: 1.6, flex: 1 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
              {project.tech.map((t) => (
                <Chip key={t} label={t} size="small" sx={{ fontWeight: 500, fontSize: "0.7rem", bgcolor: darkMode ? "rgba(124,58,237,0.22)" : "rgba(243,232,255,0.85)", color: darkMode ? "#ddd6fe" : "#5b21b6", border: darkMode ? "1px solid rgba(167,139,250,0.38)" : "1px solid rgba(167,139,250,0.28)" }} />
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

      {/* ── Section 3: School Projects ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4, mt: 7 }}>
        <SchoolIcon sx={{ fontSize: 32, color: accent }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: darkMode ? "#e2e8f0" : "#0f172a", letterSpacing: -0.3 }}
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
          mb: 3,
        }}
      >
        {projects.map((project, index) => (
          <Paper
            key={project.id}
            elevation={3}
            sx={{
              position: "relative",
              overflow: "hidden",
              animation: "staggerFade 520ms ease forwards",
              animationDelay: `${index * 75}ms`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: sectionBand.school,
              },
              p: 3,
              borderRadius: 3.5,
              background: darkMode ? "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))" : "linear-gradient(145deg, rgba(248,250,252,0.94), rgba(240,249,255,0.85))",
              border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(125,211,252,0.28)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 12px 24px rgba(2,6,23,0.34)"
                  : "0 12px 24px rgba(14,116,144,0.16)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? "#f1f5f9" : "#0f172a", flex: 1, lineHeight: 1.3 }}>
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
            <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#334155", mb: 2, lineHeight: 1.6, flex: 1 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
              {project.tech.map((t) => (
                <Chip key={t} label={t} size="small" sx={{ fontWeight: 500, fontSize: "0.7rem", bgcolor: darkMode ? "rgba(124,58,237,0.22)" : "rgba(243,232,255,0.85)", color: darkMode ? "#ddd6fe" : "#5b21b6", border: darkMode ? "1px solid rgba(167,139,250,0.38)" : "1px solid rgba(167,139,250,0.28)" }} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button
                component={Link}
                to={`/school-projects/${project.slug}`}
                size="small"
                variant="outlined"
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                View Details →
              </Button>
              {project.link && (
                <Button
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  sx={{ textTransform: "none", fontWeight: 600, color: accent }}
                >
                  Open Primary Resource
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
