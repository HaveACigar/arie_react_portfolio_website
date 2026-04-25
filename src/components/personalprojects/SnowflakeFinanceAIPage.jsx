import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GitHubIcon from "@mui/icons-material/GitHub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

const STAGES = [
  {
    key: "Bronze",
    title: "Raw Inputs",
    detail: "Billing events and forecast plan land as source-aligned tables.",
  },
  {
    key: "Silver",
    title: "Account Monthly",
    detail: "Windowed SQL transformations standardize MRR movement, open A/R, and renewal windows.",
  },
  {
    key: "Gold",
    title: "Finance Marts",
    detail: "KPI mart, variance bridge, and account risk mart drive recurring finance reviews.",
  },
  {
    key: "AI",
    title: "Finance Copilot",
    detail: "Answers are grounded on curated mart outputs only to protect narrative quality.",
  },
];

export default function SnowflakeFinanceAIPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const project = personalProjects.find((item) => item.id === "snowflake-finance-ai-command-center");
  const liveDemoUrl = process.env.REACT_APP_SNOWFLAKE_FINANCE_DEMO_URL?.trim()
    || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8512" : "");

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
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #dbeafe";

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
      <Box sx={{ maxWidth: 1050, mx: "auto" }}>
        <Button
          component={Link}
          to="/personal-projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Personal Projects
        </Button>

        <Box sx={{ textAlign: "center", mb: 5 }}>
          <AccountTreeIcon sx={{ fontSize: 48, color: accent, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            {project.title}
          </Typography>
          <Typography variant="h6" sx={{ color: accent, fontWeight: 600, mb: 2 }}>
            {project.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 800, mx: "auto", color: darkMode ? "#bbb" : "#555", lineHeight: 1.7 }}
          >
            {project.description}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              View Source
            </Button>
            {liveDemoUrl && (
              <Button
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Open Live App
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

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Live App
        </Typography>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
          {liveDemoUrl ? (
            <Box
              component="iframe"
              title="Snowflake Finance AI Command Center Live App"
              src={`${liveDemoUrl}${liveDemoUrl.includes("?") ? "&" : "?"}embed=true`}
              sx={{
                width: "100%",
                height: { xs: 560, md: 760 },
                border: 0,
                borderRadius: 2,
                background: darkMode ? "#111" : "#fff",
              }}
            />
          ) : (
            <>
              <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", lineHeight: 1.7, mb: 2 }}>
                This project runs as a separate Streamlit service. In local development, this page automatically embeds
                the app when it is running on port 8512. In deployed environments, set `REACT_APP_SNOWFLAKE_FINANCE_DEMO_URL`
                to a public Streamlit URL.
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 2,
                  overflowX: "auto",
                  borderRadius: 2,
                  bgcolor: darkMode ? "#0f172a" : "#eff6ff",
                  color: darkMode ? "#e2e8f0" : "#1e3a8a",
                  fontSize: "0.85rem",
                }}
              >
{`cd ~/Documents/arie_react_portfolio_website/projects/snowflake_finance_ai_command_center
/Users/arie/Documents/arie_react_portfolio_website/.venv/bin/streamlit run app.py --server.port 8512`}
              </Box>
            </>
          )}
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Architecture Diagram
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 2,
              alignItems: "stretch",
            }}
          >
            {STAGES.map((stage, idx) => (
              <Box key={stage.key} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    border: darkMode ? "1px solid #475569" : "1px solid #bfdbfe",
                    bgcolor: darkMode ? "rgba(30,41,59,0.72)" : "rgba(239,246,255,0.92)",
                    minHeight: 170,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 800, color: accent, letterSpacing: 0.4 }}>
                    {stage.key}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.5, mb: 1 }}>
                    {stage.title}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, color: darkMode ? "#cbd5e1" : "#475569" }}>
                    {stage.detail}
                  </Typography>
                </Box>
                {idx < STAGES.length - 1 && (
                  <Typography sx={{ color: accent, fontWeight: 800, display: { xs: "none", md: "block" } }}>
                    -&gt;
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Why This Is Snowflake-Centered
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
          {project.recruiterSignals.map((item) => (
            <Box key={item} sx={{ display: "flex", gap: 1.2, alignItems: "flex-start", mb: 1.4 }}>
              <CheckCircleIcon sx={{ color: accent, fontSize: 19, mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#374151", lineHeight: 1.6 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Key Implementation Highlights
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
          {project.highlights.slice(0, 6).map((item) => (
            <Box key={item} sx={{ display: "flex", gap: 1.2, alignItems: "flex-start", mb: 1.4 }}>
              <CheckCircleIcon sx={{ color: accent, fontSize: 19, mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#374151", lineHeight: 1.6 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Tech Stack
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
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
      </Box>
    </Box>
  );
}