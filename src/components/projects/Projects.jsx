import { useContext } from "react";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ThemeContext } from "../../context";
import { projects } from "../../data";
import "./projects.scss";

export default function Projects() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Box
      className="projects-section"
      id="projects"
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        width: "100%",
        maxWidth: 1100,
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
          mb: 4,
          letterSpacing: 1,
        }}
      >
        Projects
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {projects.map((project) => (
          <Paper
            key={project.id}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              background: darkMode ? "#2a2a2a" : "#fff",
              border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 8px 24px rgba(144,202,249,0.12)"
                  : "0 8px 24px rgba(25,118,210,0.12)",
              },
            }}
          >
            {/* Header with status badge */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#e0e0e0" : "#222",
                  flex: 1,
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </Typography>
              <Chip
                label={project.status}
                size="small"
                sx={{
                  ml: 1,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  bgcolor:
                    project.status === "Ongoing"
                      ? darkMode
                        ? "#1b5e20"
                        : "#e8f5e9"
                      : darkMode
                      ? "#0d47a1"
                      : "#e3f2fd",
                  color:
                    project.status === "Ongoing"
                      ? darkMode
                        ? "#81c784"
                        : "#2e7d32"
                      : darkMode
                      ? "#90caf9"
                      : "#1565c0",
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "#bbb" : "#555",
                mb: 2,
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              {project.description}
            </Typography>

            {/* Tech tags */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
              {project.tech.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    bgcolor: darkMode ? "#333" : "#f3e5f5",
                    color: darkMode ? "#ce93d8" : "#7b1fa2",
                    border: darkMode
                      ? "1px solid #9c27b0"
                      : "1px solid #ce93d8",
                  }}
                />
              ))}
            </Box>

            {/* Link */}
            {project.link && (
              <Button
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                endIcon={<OpenInNewIcon />}
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  color: darkMode ? "#90caf9" : "#1976d2",
                }}
              >
                View Project
              </Button>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
