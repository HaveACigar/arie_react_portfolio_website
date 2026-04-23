import { useContext } from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { ThemeContext } from "../../context";
import { education } from "../../data";
import "./education.scss";

export default function Education() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Box
      className="education-section modern-section"
      id="education"
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
          color: darkMode ? "#c4b5fd" : "#6d28d9",
          mb: 0.6,
        }}
      >
        Credentials
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
        Education
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {education.map((edu, index) => (
          <Paper
            key={edu.id}
            elevation={3}
            sx={{
              animation: "staggerFade 520ms ease forwards",
              animationDelay: `${index * 110}ms`,
              opacity: 0,
              p: 3,
              borderRadius: 3.5,
              background: darkMode ? "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))" : "linear-gradient(145deg, rgba(248,250,252,0.94), rgba(240,249,255,0.85))",
              border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(125,211,252,0.28)",
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: darkMode
                  ? "0 10px 24px rgba(2,6,23,0.34)"
                  : "0 10px 24px rgba(14,116,144,0.16)",
              },
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                overflow: "hidden",
                bgcolor: darkMode ? "rgba(30,58,95,0.88)" : "rgba(224,242,254,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                mt: 0.5,
                border: darkMode ? "2px solid rgba(56,189,248,0.5)" : "2px solid rgba(125,211,252,0.75)",
              }}
            >
              <img
                src={edu.logo}
                alt={edu.school}
                style={{ width: 36, height: 36, objectFit: "contain" }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#f1f5f9" : "#0f172a",
                  mb: 0.3,
                }}
              >
                {edu.degree}
              </Typography>
              {edu.specialization && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: darkMode ? "#7dd3fc" : "#0c4a6e",
                    fontWeight: 600,
                    mb: 0.3,
                  }}
                >
                  {edu.specialization} specialization
                  {edu.gpa ? ` · ${edu.gpa} GPA` : ""}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{
                  color: darkMode ? "#94a3b8" : "#475569",
                  mb: 1.5,
                  fontStyle: "italic",
                }}
              >
                {edu.school}, {edu.location} &middot; {edu.period}
              </Typography>

              {edu.coursework && edu.coursework.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: darkMode ? "#999" : "#888",
                      fontWeight: 600,
                      mb: 0.5,
                      display: "block",
                    }}
                  >
                    Key Coursework:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                    {edu.coursework.map((course) => (
                      <Chip
                        key={course}
                        label={course}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          bgcolor: darkMode ? "rgba(124,58,237,0.22)" : "rgba(243,232,255,0.85)",
                          color: darkMode ? "#ddd6fe" : "#5b21b6",
                          border: darkMode
                            ? "1px solid rgba(167,139,250,0.38)"
                            : "1px solid rgba(167,139,250,0.28)",
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
