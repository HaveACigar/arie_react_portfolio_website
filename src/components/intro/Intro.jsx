import { useContext, useEffect, useRef } from "react";
import { Box, Typography, Avatar, Button, Chip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import { init } from "ityped";
import "./intro.scss";
import { ThemeContext } from "../../context";
import { personalInfo } from "../../data";

export default function Intro() {
  const textRef = useRef();
  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: [
        "Intermediate Data Analyst",
        "ML Practitioner",
        "Backend Engineer",
        "Problem Solver",
      ],
    });
  }, []);

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="intro" id="intro">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "70vh", width: "100%", py: 6 }}
      >
        <Avatar
          src="assets/Arie_Profile_Pic.jpg"
          alt="Arie DeKraker"
          sx={{
            width: 160,
            height: 160,
            boxShadow: 4,
            mb: 3,
            border: darkMode
              ? "3px solid #90caf9"
              : "3px solid #1976d2",
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: darkMode ? "#f5f5f5" : "#222",
            mb: 1,
            textAlign: "center",
          }}
        >
          {personalInfo.name}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: darkMode ? "#90caf9" : "#1976d2",
            fontWeight: 600,
            mb: 1,
            textAlign: "center",
          }}
        >
          <span ref={textRef}></span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 600,
            textAlign: "center",
            color: darkMode ? "#bbb" : "#555",
            lineHeight: 1.7,
            mb: 3,
            px: 2,
          }}
        >
          {personalInfo.tagline}
        </Typography>

        {/* Quick stat chips */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            mb: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["6+ Years at Ford", "3.9 GPA", "Master's in Data Science"].map(
            (stat) => (
              <Chip
                key={stat}
                label={stat}
                sx={{
                  fontWeight: 600,
                  bgcolor: darkMode ? "#333" : "#e3f2fd",
                  color: darkMode ? "#90caf9" : "#1565c0",
                  border: darkMode
                    ? "1px solid #555"
                    : "1px solid #bbdefb",
                  fontSize: "0.85rem",
                }}
              />
            )
          )}
        </Box>

        {/* CTA buttons */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            href="/Arie_Resume_general.pdf"
            download
            sx={{ fontWeight: 600, px: 3, py: 1.2, borderRadius: 2 }}
          >
            Download Resume
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EmailIcon />}
            href="/contactme"
            sx={{ fontWeight: 600, px: 3, py: 1.2, borderRadius: 2 }}
          >
            Contact Me
          </Button>
        </Box>

        {/* Specialty page links */}
        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="text"
            href="/data-science"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.95rem",
              color: darkMode ? "#90caf9" : "#1976d2",
            }}
          >
            📊 Data Science & Analysis →
          </Button>
          <Button
            variant="text"
            href="/software-engineering"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.95rem",
              color: darkMode ? "#81c784" : "#2e7d32",
            }}
          >
            💻 Backend Engineering →
          </Button>
        </Box>
      </Box>
    </div>
  );
}
