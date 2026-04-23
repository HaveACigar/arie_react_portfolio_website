import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ThemeContext } from "../../context";
import "./aboutMe.scss";

export default function AboutMe() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const metrics = [
    { label: "20M+ Requests/mo", desc: "API throughput at Ford" },
    { label: "99.999% Uptime", desc: "Production reliability" },
    { label: "5+ Years", desc: "Industry experience" },
    { label: "3.9 GPA", desc: "Master's program" },
  ];

  return (
    <Box
      className="aboutMe modern-section"
      id="aboutMe"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 6 },
        width: "100%",
        maxWidth: 980,
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
          color: darkMode ? "#38bdf8" : "#0369a1",
          mb: 0.5,
        }}
      >
        Background
      </Typography>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: darkMode ? "#e2e8f0" : "#0f172a",
          mb: 3,
          letterSpacing: -0.4,
        }}
      >
        About Me
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.05rem",
          lineHeight: 1.9,
          color: darkMode ? "#cbd5e1" : "#334155",
          textAlign: "center",
          maxWidth: 750,
          mx: "auto",
        }}
      >
        I'm a data-driven professional with a strong background in software
        engineering and an evolving passion for data science. With a Bachelor's
        in Computer Science from Eastern Michigan University and a Master's in
        Data Science and Analytics from the University of Calgary (3.9 GPA), I
        blend technical expertise with analytical acumen.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.05rem",
          lineHeight: 1.9,
          color: darkMode ? "#cbd5e1" : "#334155",
          textAlign: "center",
          maxWidth: 750,
          mx: "auto",
        }}
      >
        At Ford Motor Company, I've progressed from engineering RESTful APIs
        handling 20M+ monthly requests to leading the design and deployment of
        predictive Deep Learning models for subscription churn forecasting. I
        specialize in end-to-end data solutions—from scalable pipelines and
        data governance to MLOps and prescriptive analytics.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.05rem",
          lineHeight: 1.9,
          color: darkMode ? "#cbd5e1" : "#334155",
          textAlign: "center",
          maxWidth: 750,
          mx: "auto",
          mb: 4,
        }}
      >
        I thrive at the intersection of engineering and analytics, converting
        complex business challenges into actionable insights using Machine
        Learning, Generative AI, A/B testing, and advanced visualization.
      </Typography>

      {/* Key metrics row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 1.5, md: 3 },
          flexWrap: "wrap",
        }}
      >
        {metrics.map((m) => (
          <Box
            key={m.label}
            sx={{
              textAlign: "center",
              p: 2,
              borderRadius: 3,
              background: darkMode ? "linear-gradient(135deg, rgba(30,41,59,0.88), rgba(15,23,42,0.8))" : "linear-gradient(135deg, rgba(240,249,255,0.9), rgba(239,246,255,0.8))",
              border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(125,211,252,0.35)",
              minWidth: 130,
              boxShadow: darkMode ? "0 10px 24px rgba(2,6,23,0.28)" : "0 8px 20px rgba(14,116,144,0.12)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: darkMode ? "#7dd3fc" : "#0c4a6e",
                fontSize: "1.1rem",
              }}
            >
              {m.label}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: darkMode ? "#94a3b8" : "#475569" }}
            >
              {m.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
