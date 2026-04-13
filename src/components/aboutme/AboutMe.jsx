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
      className="aboutMe"
      id="aboutMe"
      sx={{
        py: 6,
        px: { xs: 2, md: 6 },
        width: "100%",
        maxWidth: 900,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: darkMode ? "#90caf9" : "#1976d2",
          mb: 3,
          letterSpacing: 1,
        }}
      >
        About Me
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.05rem",
          lineHeight: 1.8,
          color: darkMode ? "#ccc" : "#444",
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
          lineHeight: 1.8,
          color: darkMode ? "#ccc" : "#444",
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
          lineHeight: 1.8,
          color: darkMode ? "#ccc" : "#444",
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
                color: darkMode ? "#90caf9" : "#1976d2",
                fontSize: "1.1rem",
              }}
            >
              {m.label}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: darkMode ? "#999" : "#888" }}
            >
              {m.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
