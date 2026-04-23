import React, { useContext } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { ThemeContext } from "../../context";

const FITNESS_LOG_URL = "https://arieai-chat-log--fitness-app-4a84c.us-central1.hosted.app/";

export default function FitnessLogRoutePage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Box component="main" sx={{ width: "100%", minHeight: "calc(100vh - 120px)", pt: 11, px: 2, pb: 4 }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          borderRadius: 4,
          p: { xs: 2, md: 3 },
          mb: 2,
          border: darkMode ? "1px solid rgba(148,163,184,0.24)" : "1px solid rgba(148,163,184,0.22)",
          bgcolor: darkMode ? "rgba(15,23,42,0.64)" : "rgba(255,255,255,0.78)",
          backdropFilter: "blur(10px)",
          boxShadow: darkMode ? "0 16px 36px rgba(2,6,23,0.36)" : "0 14px 30px rgba(15,23,42,0.12)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.8, color: darkMode ? "#e2e8f0" : "#0f172a" }}>
              Fitness Log
            </Typography>
            <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#334155", maxWidth: 760, lineHeight: 1.7 }}>
              Embedded live app for daily weight, workouts, sleep, nutrition, and progress tracking.
              You can use it inline here or pop it out to full screen in a dedicated tab.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 1 }}>
              <Chip icon={<FitnessCenterIcon />} label="Workout Tracking" sx={{ fontWeight: 700 }} />
              <Chip icon={<MonitorHeartIcon />} label="Health Trends" sx={{ fontWeight: 700 }} />
            </Stack>
          </Box>

          <Button
            href={FITNESS_LOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<OpenInNewIcon />}
            sx={{ textTransform: "none", fontWeight: 700, px: 2.4, py: 1.1 }}
          >
            Open Full App
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          border: darkMode ? "1px solid rgba(148,163,184,0.24)" : "1px solid rgba(148,163,184,0.22)",
          bgcolor: darkMode ? "rgba(15,23,42,0.68)" : "#fff",
          boxShadow: darkMode ? "0 18px 34px rgba(2,6,23,0.42)" : "0 14px 30px rgba(15,23,42,0.14)",
        }}
      >
        <iframe
          title="Fitness Log"
          src={FITNESS_LOG_URL}
          style={{ width: "100%", height: "78vh", border: "none", display: "block", background: "transparent" }}
          loading="lazy"
        />
      </Box>
    </Box>
  );
}
