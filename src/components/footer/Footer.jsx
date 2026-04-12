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
      className="site-footer"
      sx={{
        py: 4,
        px: { xs: 2, md: 6 },
        mt: 4,
        borderTop: darkMode ? "1px solid #444" : "1px solid #e0e0e0",
        background: darkMode ? "#1a1a1a" : "#f5f7fa",
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
              fontWeight: 700,
              color: darkMode ? "#90caf9" : "#1976d2",
            }}
          >
            {personalInfo.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: darkMode ? "#aaa" : "#666" }}
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
                color: darkMode ? "#aaa" : "#666",
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: darkMode ? "#ccc" : "#444" }}
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
                color: darkMode ? "#90caf9" : "#1976d2",
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
          color: darkMode ? "#666" : "#999",
        }}
      >
        &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
        reserved.
      </Typography>
    </Box>
  );
}
