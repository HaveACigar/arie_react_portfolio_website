import { useContext } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { ThemeContext } from "../../context";
import { personalInfo } from "../../data";
import "./footer.scss";

export default function Footer() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Box
      component="footer"
      className="site-footer modern-section"
      sx={{
        py: 4,
        px: { xs: 2, md: 6 },
        mt: 4,
        borderTop: darkMode ? "1px solid rgba(148,163,184,0.24)" : "1px solid rgba(148,163,184,0.3)",
        background: darkMode ? "rgba(15,23,42,0.68)" : "rgba(255,255,255,0.76)",
        backdropFilter: "blur(10px)",
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Left: Name & title */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: darkMode ? "#e2e8f0" : "#0f172a",
            }}
          >
            {personalInfo.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: darkMode ? "#94a3b8" : "#475569" }}
          >
            {personalInfo.title}
          </Typography>
        </Box>

        {/* Center: Contact */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PhoneIcon
              sx={{
                fontSize: 18,
                color: darkMode ? "#94a3b8" : "#475569",
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: darkMode ? "#cbd5e1" : "#334155" }}
            >
              {personalInfo.phone}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EmailIcon
              sx={{
                fontSize: 18,
                color: darkMode ? "#aaa" : "#666",
              }}
            />
            <Typography
              variant="body2"
              component="a"
              href={`mailto:${personalInfo.email}`}
              sx={{
                color: darkMode ? "#7dd3fc" : "#0369a1",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {personalInfo.email}
            </Typography>
          </Box>
        </Box>

        {/* Right: Social icons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="LinkedIn" arrow>
            <IconButton
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener"
              size="small"
              sx={{
                bgcolor: darkMode ? "rgba(30,41,59,0.7)" : "rgba(241,245,249,0.9)",
                border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(148,163,184,0.26)",
                "&:hover": { transform: "translateY(-1px)" },
              }}
            >
              <img
                src="assets/linkedin.png"
                alt="LinkedIn"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub" arrow>
            <IconButton
              href={personalInfo.github}
              target="_blank"
              rel="noopener"
              size="small"
              sx={{
                bgcolor: darkMode ? "rgba(30,41,59,0.7)" : "rgba(241,245,249,0.9)",
                border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(148,163,184,0.26)",
                "&:hover": { transform: "translateY(-1px)" },
              }}
            >
              <img
                src="assets/github.png"
                alt="GitHub"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="HackerRank" arrow>
            <IconButton
              href={personalInfo.hackerrank}
              target="_blank"
              rel="noopener"
              size="small"
              sx={{
                bgcolor: darkMode ? "rgba(30,41,59,0.7)" : "rgba(241,245,249,0.9)",
                border: darkMode ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(148,163,184,0.26)",
                "&:hover": { transform: "translateY(-1px)" },
              }}
            >
              <img
                src="assets/hackerrank.png"
                alt="HackerRank"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Copyright */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 3,
          color: darkMode ? "#64748b" : "#64748b",
        }}
      >
        &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
        reserved.
      </Typography>
    </Box>
  );
}
