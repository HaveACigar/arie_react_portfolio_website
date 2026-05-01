import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function EmbeddedAppFrame({
  title,
  src,
  darkMode,
  height = { xs: 500, md: 700 },
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
      {!loaded && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            bgcolor: darkMode ? "rgba(17,17,17,0.94)" : "rgba(248,250,252,0.96)",
            borderRadius: 2,
          }}
        >
          <CircularProgress size={30} thickness={5} />
          <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", fontWeight: 600 }}>
            Loading dashboard...
          </Typography>
        </Box>
      )}

      <Box
        component="iframe"
        title={title}
        src={src}
        onLoad={() => setLoaded(true)}
        sx={{
          width: "100%",
          height,
          border: 0,
          borderRadius: 2,
          background: darkMode ? "#111" : "#fff",
          opacity: loaded ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
      />
    </Box>
  );
}