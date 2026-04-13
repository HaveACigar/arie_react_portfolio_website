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
      className="education-section"
      id="education"
      sx={{
        py: 8,
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
          mb: 5,
          letterSpacing: 1,
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
        {education.map((edu) => (
          <Paper
            key={edu.id}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              background: darkMode ? "#2a2a2a" : "#fff",
              border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: darkMode
                  ? "0 6px 20px rgba(144,202,249,0.10)"
                  : "0 6px 20px rgba(25,118,210,0.10)",
              },
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                overflow: "hidden",
                bgcolor: darkMode ? "#1e3a5f" : "#e3f2fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                mt: 0.5,
                border: darkMode ? "2px solid #1976d2" : "2px solid #bbdefb",
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
                  color: darkMode ? "#e0e0e0" : "#222",
                  mb: 0.3,
                }}
              >
                {edu.degree}
              </Typography>
              {edu.specialization && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: darkMode ? "#90caf9" : "#1976d2",
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
                  color: darkMode ? "#aaa" : "#666",
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
                          bgcolor: darkMode ? "#333" : "#fff3e0",
                          color: darkMode ? "#ffb74d" : "#e65100",
                          border: darkMode
                            ? "1px solid #ff9800"
                            : "1px solid #ffcc80",
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
