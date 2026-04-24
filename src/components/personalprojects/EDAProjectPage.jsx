import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Paper, Chip, Button, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

/**
 * EDAProjectPage — Detailed page for the EDA & Visualization Dashboard project.
 *
 * This page provides a deep-dive into what the project demonstrates,
 * the data quality challenges tackled, the tech stack, and key takeaways.
 * It serves as a portfolio showcase piece for anyone reviewing Arie's work.
 *
 * Route: /personal-projects/eda-visualization-dashboard
 */
export default function EDAProjectPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  // Pull the project data from the central data source
  const project = personalProjects.find(
    (p) => p.id === "eda-visualization-dashboard"
  );

  // Accent colour helper
  const accent = darkMode ? "#90caf9" : "#1976d2";
  const cardBg = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";
  const dashboardUrl = process.env.REACT_APP_EDA_DASHBOARD_URL;

  // ── Data quality issues tackled — shown as a visual checklist ──
  const dataQualityIssues = [
    "Aggregate entities mixed with countries (regional and income rollups)",
    "Sparse and uneven indicator coverage across years and countries",
    "Mixed null markers and string/object values in numeric fields",
    "Country naming inconsistencies and alias normalization",
    "Invalid country code rows requiring filtering",
    "Out-of-range and impossible values requiring sanity checks",
    "Duplicate country-year rows after multi-indicator merges",
    "Leading/trailing whitespace and schema inconsistencies in raw fields",
  ];

  // ── Dashboard sections for the overview ──
  const dashboardSections = [
    "Data Quality Overview — raw vs cleaned comparison with missing-data charts",
    "Descriptive Statistics — full summary table with skewness & missing %",
    "Correlation Explorer — interactive heatmap + top relationships table",
    "Distribution Analysis — histogram + box plot for any indicator",
    "Country Rankings — top-N countries filterable by metric and year",
    "Global Trends — year-over-year line charts",
    "Scatter & Regression — bivariate analysis with OLS trendline",
    "Income Group Comparison — box plots across World Bank-style income tiers",
    "Multi-Country Comparison — overlay selected countries over time",
  ];

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

        {/* ── Header ── */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <BarChartIcon sx={{ fontSize: 48, color: accent, mb: 1 }} />
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
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
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
          </Box>
        </Box>

        <Divider sx={{ mb: 5, borderColor: darkMode ? "#444" : "#e0e0e0" }} />

        {/* ── Tech Stack ── */}
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

        {/* ── Skills Showcased ── */}
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

        {/* ── Key Highlights ── */}
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

        {/* ── Data Quality Challenges ── */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Data Quality Issues Tackled
        </Typography>
        <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 2 }}>
          The raw dataset is merged from real World Bank indicators and contains
          practical data quality issues that require comprehensive wrangling:
        </Typography>
        <Paper
          elevation={2}
          sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}
        >
          {dataQualityIssues.map((issue, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: i < dataQualityIssues.length - 1 ? 1.2 : 0 }}>
              <Typography variant="body2" sx={{ color: accent, fontWeight: 700, minWidth: 24 }}>
                {i + 1}.
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                {issue}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* ── Live Dashboard Embed ── */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Live Dashboard Preview
        </Typography>
        {dashboardUrl ? (
          <Paper
            elevation={2}
            sx={{
              p: 1.5,
              borderRadius: 3,
              background: cardBg,
              border: cardBorder,
              mb: 5,
            }}
          >
            <Box
              component="iframe"
              title="EDA Dashboard"
              src={`${dashboardUrl}${dashboardUrl.includes("?") ? "&" : "?"}embed=true`}
              sx={{
                width: "100%",
                height: { xs: 500, md: 700 },
                border: 0,
                borderRadius: 2,
                background: darkMode ? "#111" : "#fff",
              }}
            />
          </Paper>
        ) : (
          <Paper
            elevation={2}
            sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}
          >
            <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", lineHeight: 1.7, mb: 2 }}>
              Dashboard embed is ready. Add a deployed Streamlit URL using
              <strong> REACT_APP_EDA_DASHBOARD_URL </strong>
              to render the live dashboard directly on this page.
            </Typography>
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Open Project Repository
            </Button>
          </Paper>
        )}

        {/* ── Dashboard Sections ── */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Interactive Dashboard Sections
        </Typography>
        <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 2 }}>
          The Streamlit dashboard provides 9 interactive sections covering the
          full exploratory data analysis workflow:
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 5,
          }}
        >
          {dashboardSections.map((section, i) => {
            const [title, desc] = section.split(" — ");
            return (
              <Paper
                key={i}
                elevation={1}
                sx={{
                  p: 2, borderRadius: 2, background: cardBg, border: cardBorder,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: accent }}>
                  {i + 1}. {title}
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

        {/* ── Project Architecture ── */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Project Architecture
        </Typography>
        <Paper
          elevation={2}
          sx={{
            p: 3, borderRadius: 3, background: darkMode ? "#1a1a2e" : "#f5f5f5",
            border: cardBorder, mb: 5, fontFamily: "monospace", fontSize: "0.85rem",
            color: darkMode ? "#e0e0e0" : "#333", lineHeight: 1.8, whiteSpace: "pre",
            overflowX: "auto",
          }}
        >
{`├── data/
│   ├── raw/global_health_messy.csv        # Intentionally messy dataset
│   └── processed/global_health_clean.csv  # Output of cleaning pipeline
├── src/
│   ├── generate_messy_data.py             # Dataset generator script
│   ├── cleaning.py                        # 7-step data wrangling pipeline
│   ├── analysis.py                        # Statistical analysis functions
│   └── visualization.py                   # Plotly chart builders (8 types)
├── app.py                                 # Streamlit dashboard entry point
├── requirements.txt
└── README.md`}
        </Paper>

        {/* ── Bottom CTA ── */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<GitHubIcon />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Explore the Full Repository on GitHub
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
