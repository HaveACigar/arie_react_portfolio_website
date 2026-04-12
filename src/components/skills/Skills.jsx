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
      className="skills-section"
      id="skills"
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
        Skills & Technologies
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
        }}
      >
        {skills.map((group) => (
          <Paper
            key={group.category}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              background: darkMode ? "#2a2a2a" : "#fff",
              border: darkMode ? "1px solid #444" : "1px solid #e3f0ff",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: darkMode
                  ? "0 8px 24px rgba(144,202,249,0.12)"
                  : "0 8px 24px rgba(25,118,210,0.12)",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: darkMode ? "#90caf9" : "#1976d2",
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
                    bgcolor: darkMode ? "#333" : "#e3f2fd",
                    color: darkMode ? "#e0e0e0" : "#1565c0",
                    border: darkMode
                      ? "1px solid #555"
                      : "1px solid #bbdefb",
                    "&:hover": {
                      bgcolor: darkMode ? "#1976d2" : "#1976d2",
                      color: "#fff",
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
