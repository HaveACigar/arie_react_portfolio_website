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
      className="experience-section"
      id="experience"
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
        Work Experience
      </Typography>

      <Box className="timeline">
        {jobs.map((job, index) => (
          <Box
            key={job.id}
            className="timeline-item"
            sx={{
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
                bgcolor: darkMode ? "#555" : "#bbdefb",
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
                  bgcolor: darkMode ? "#1e3a5f" : "#e3f2fd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 2,
                  border: darkMode ? "2px solid #1976d2" : "2px solid #bbdefb",
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
                borderRadius: 3,
                minWidth: 0,
                overflow: "hidden",
                wordBreak: "break-word",
                background: darkMode ? "#2a2a2a" : "#fff",
                border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: darkMode
                    ? "0 6px 20px rgba(144,202,249,0.10)"
                    : "0 6px 20px rgba(25,118,210,0.10)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#e0e0e0" : "#222",
                  mb: 0.5,
                }}
              >
                {job.role}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: darkMode ? "#90caf9" : "#1976d2",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {job.company} &middot; {job.team}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: darkMode ? "#aaa" : "#666",
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
                      bgcolor: darkMode ? "#333" : "#e8f5e9",
                      color: darkMode ? "#81c784" : "#2e7d32",
                      border: darkMode
                        ? "1px solid #4caf50"
                        : "1px solid #a5d6a7",
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
