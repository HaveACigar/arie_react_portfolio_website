import { useContext } from "react";
import { Box, Typography, Chip, Paper } from "@mui/material";
import { ThemeContext } from "../../context";
import { skills } from "../../data";
import "./skills.scss";

export default function Skills() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Box
      className="skills-section modern-section"
      id="skills"
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
          color: darkMode ? "#34d399" : "#047857",
          mb: 0.8,
        }}
      >
        Capabilities
      </Typography>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: darkMode ? "#e2e8f0" : "#0f172a",
          mb: 4,
          letterSpacing: -0.4,
        }}
      >
        Skills & Technologies
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
        }}
      >
        {skills.map((group, index) => (
          <Paper
            key={group.category}
            elevation={3}
            sx={{
              animation: "staggerFade 520ms ease forwards",
              animationDelay: `${index * 90}ms`,
              p: 3,
              borderRadius: 3.5,
              background: darkMode ? "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))" : "linear-gradient(145deg, rgba(248,250,252,0.94), rgba(240,249,255,0.85))",
              border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(125,211,252,0.28)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 12px 24px rgba(2,6,23,0.34)"
                  : "0 12px 24px rgba(14,116,144,0.16)",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: darkMode ? "#7dd3fc" : "#0c4a6e",
                mb: 2,
                fontSize: "1.05rem",
              }}
            >
              {group.category}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {group.items.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    fontWeight: 500,
                    bgcolor: darkMode ? "rgba(15,118,110,0.24)" : "rgba(236,253,245,0.85)",
                    color: darkMode ? "#99f6e4" : "#065f46",
                    border: darkMode
                      ? "1px solid rgba(45,212,191,0.36)"
                      : "1px solid rgba(16,185,129,0.28)",
                    "&:hover": {
                      bgcolor: darkMode ? "rgba(15,118,110,0.38)" : "rgba(209,250,229,0.95)",
                      color: darkMode ? "#ccfbf1" : "#064e3b",
                    },
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
