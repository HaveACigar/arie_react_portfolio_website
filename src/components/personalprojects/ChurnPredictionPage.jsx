import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Paper, Chip, Button, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import EmbeddedAppFrame from "./EmbeddedAppFrame";
import StorytellingGuide from "./StorytellingGuide";
import "./personalProjects.scss";

/**
 * ChurnPredictionPage — Detailed project page for the Supervised ML:
 * Customer Churn Prediction Pipeline.
 *
 * Route: /personal-projects/supervised-ml-pipeline
 */
export default function ChurnPredictionPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const project = personalProjects.find((p) => p.id === "supervised-ml-pipeline");

  const accent     = darkMode ? "#90caf9" : "#1976d2";
  const cardBg     = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";

  const dashboardUrl = project.liveDemo || process.env.REACT_APP_CHURN_DASHBOARD_URL;

  const pipelineSteps = [
    "TotalCharges coerced to numeric; 11 whitespace-valued rows filled with median",
    "Binary features (gender, Partner, Dependents, PhoneService, PaperlessBilling) → OneHotEncoder(drop='first')",
    "Multi-category features (InternetService, Contract, PaymentMethod, etc.) → OneHotEncoder(drop='first', handle_unknown='ignore')",
    "Numeric features (tenure, MonthlyCharges, TotalCharges, SeniorCitizen) → StandardScaler",
    "All steps wrapped in a ColumnTransformer and combined into a single sklearn Pipeline per model",
    "Pipeline is fitted only on training folds, never on the test set — zero data leakage",
  ];

  const modelSummary = [
    {
      name: "Logistic Regression",
      notes: "Baseline linear model with class_weight='balanced' for the 27/73 churn imbalance",
    },
    {
      name: "Random Forest",
      notes: "Ensemble of 100 decision trees; class weights balanced; feature importance via mean decrease in impurity",
    },
    {
      name: "Gradient Boosting",
      notes: "Sequential boosting on residuals; strong out-of-the-box AUC benchmark",
    },
    {
      name: "XGBoost",
      notes: "Gradient-boosted trees with scale_pos_weight tuned for class imbalance; selected for SHAP explainability",
    },
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

        {/* Back navigation */}
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
          <PsychologyIcon sx={{ fontSize: 48, color: accent, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            {project.title}
          </Typography>
          <Typography variant="h6" sx={{ color: accent, fontWeight: 600, mb: 2 }}>
            {project.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 780, mx: "auto", color: darkMode ? "#bbb" : "#555", lineHeight: 1.7 }}
          >
            {project.description}
          </Typography>

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
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
          {project.highlights.map((h, i) => (
            <Box
              key={i}
              sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: i < project.highlights.length - 1 ? 1.5 : 0 }}
            >
              <CheckCircleIcon sx={{ color: accent, fontSize: 20, mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                {h}
              </Typography>
            </Box>
          ))}
        </Paper>

        <StorytellingGuide
          insights={project.highlights}
          darkMode={darkMode}
          accent={accent}
          cardBg={cardBg}
          cardBorder={cardBorder}
          sectionTitle="How To Read These Insights"
        />

        {/* ── Preprocessing Pipeline ── */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Preprocessing Pipeline
        </Typography>
        <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", mb: 2 }}>
          All feature engineering is encapsulated in a leak-free sklearn Pipeline
          fitted exclusively on training folds during cross-validation:
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
          {pipelineSteps.map((step, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: i < pipelineSteps.length - 1 ? 1.2 : 0 }}>
              <Typography variant="body2" sx={{ color: accent, fontWeight: 700, minWidth: 24 }}>
                {i + 1}.
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                {step}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* ── Models ── */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Models Trained
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5 }}>
          {modelSummary.map((m) => (
            <Paper
              key={m.name}
              elevation={1}
              sx={{ p: 2.5, borderRadius: 3, background: cardBg, border: cardBorder }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: accent, mb: 0.5 }}>
                {m.name}
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555" }}>
                {m.notes}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* ── Live Dashboard Embed ── */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Live Dashboard
        </Typography>
        {dashboardUrl ? (
          <Paper
            elevation={2}
            sx={{ p: 1.5, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}
          >
            <EmbeddedAppFrame
              title="Churn Prediction Dashboard"
              src={`${dashboardUrl}${dashboardUrl.includes("?") ? "&" : "?"}embed=true`}
              darkMode={darkMode}
            />
          </Paper>
        ) : (
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
            <Typography variant="body2" sx={{ color: darkMode ? "#bbb" : "#555", lineHeight: 1.7, mb: 2 }}>
              The dashboard URL is not configured for this build, so the live app preview is unavailable here.
              You can still review the implementation in GitHub.
            </Typography>
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              View Source Code
            </Button>
          </Paper>
        )}

      </Box>
    </Box>
  );
}
