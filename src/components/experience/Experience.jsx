import { useContext } from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { ThemeContext } from "../../context";
import { experience } from "../../data";
import "./experience.scss";

export default function Experience({ filter }) {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const jobs = filter
    ? experience.filter((j) => j.category === filter)
    : experience;

  return (
    <Box
      className="experience-section modern-section"
      id="experience"
      sx={{
        py: { xs: 7, md: 8 },
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
          color: darkMode ? "#fda4af" : "#be123c",
          mb: 0.6,
        }}
      >
        Career
      </Typography>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: darkMode ? "#e2e8f0" : "#0f172a",
          mb: 5,
          letterSpacing: -0.4,
        }}
      >
        Work Experience
      </Typography>

      <Box className="timeline">
        {jobs.map((job, index) => (
          <Box
            key={job.id}
            className="timeline-item"
            sx={{
              animation: "staggerFade 540ms ease forwards",
              animationDelay: `${index * 95}ms`,
              opacity: 0,
              display: "flex",
              mb: 5,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: { xs: 16, md: 24 },
                top: 48,
                bottom: index < jobs.length - 1 ? -40 : "auto",
                width: 2,
                bgcolor: darkMode ? "rgba(148,163,184,0.45)" : "rgba(56,189,248,0.42)",
              },
            }}
          >
            {/* Timeline dot */}
            <Box
              sx={{
                minWidth: { xs: 36, md: 52 },
                display: "flex",
                justifyContent: "center",
                pt: 1,
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  overflow: "hidden",
                  bgcolor: darkMode ? "rgba(30,58,95,0.88)" : "rgba(224,242,254,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: darkMode ? "0 8px 18px rgba(2,6,23,0.38)" : "0 8px 18px rgba(14,116,144,0.16)",
                  border: darkMode ? "2px solid rgba(56,189,248,0.5)" : "2px solid rgba(125,211,252,0.75)",
                }}
              >
                <img
                  src="assets/Ford_Logo.png"
                  alt="Ford"
                  style={{ width: 30, height: 30, objectFit: "contain" }}
                />
              </Box>
            </Box>

            {/* Content card */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                ml: 2,
                p: { xs: 2, md: 3 },
                borderRadius: 3.5,
                minWidth: 0,
                overflow: "hidden",
                wordBreak: "break-word",
                background: darkMode ? "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))" : "linear-gradient(145deg, rgba(248,250,252,0.94), rgba(240,249,255,0.85))",
                border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(125,211,252,0.28)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: darkMode
                    ? "0 10px 24px rgba(2,6,23,0.34)"
                    : "0 10px 24px rgba(14,116,144,0.16)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#f1f5f9" : "#0f172a",
                  mb: 0.5,
                }}
              >
                {job.role}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: darkMode ? "#7dd3fc" : "#0c4a6e",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {job.company} &middot; {job.team}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: darkMode ? "#94a3b8" : "#475569",
                  mb: 1,
                  fontStyle: "italic",
                }}
              >
                {job.period} &middot; {job.employmentType} &middot; {job.location}
              </Typography>

              {job.summary && (
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "#bbb" : "#555",
                    mb: 2,
                    lineHeight: 1.7,
                  }}
                >
                  {job.summary}
                </Typography>
              )}

              <Typography
                variant="subtitle2"
                sx={{
                  color: darkMode ? "#ccc" : "#333",
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Key Contributions:
              </Typography>

              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {job.highlights.map((item, i) => (
                  <Typography
                    key={i}
                    component="li"
                    variant="body2"
                    sx={{
                      mb: 1,
                      lineHeight: 1.7,
                      color: darkMode ? "#ccc" : "#444",
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mt: 2 }}>
                {job.tech.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      bgcolor: darkMode ? "rgba(15,118,110,0.24)" : "rgba(236,253,245,0.85)",
                      color: darkMode ? "#99f6e4" : "#065f46",
                      border: darkMode
                        ? "1px solid rgba(45,212,191,0.36)"
                        : "1px solid rgba(16,185,129,0.28)",
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
