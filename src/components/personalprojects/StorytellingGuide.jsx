import { Box, Paper, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function getClaimKeyword(insight) {
  if (!insight) return "the lead phrase";
  const cleaned = insight.replace(/^[\s\-\d.]+/, "").trim();
  const stopWords = new Set(["the", "a", "an", "and", "of", "to", "for", "with"]);
  const words = cleaned.split(/\s+/).filter((word) => !stopWords.has(word.toLowerCase()));
  return words.slice(0, 3).join(" ") || "the lead phrase";
}

export default function StorytellingGuide({
  insights = [],
  darkMode,
  accent,
  cardBg,
  cardBorder,
  sectionTitle = "How To Read The Data Story",
}) {
  const firstKeyword = getClaimKeyword(insights[0]);
  const secondKeyword = getClaimKeyword(insights[1]);

  const guideBullets = [
    `Start with the first 3-5 words in each insight. Treat that phrase as the core claim you are validating (for example: ${firstKeyword}).`,
    `Read the middle clause for evidence language (words like shows, reveals, demonstrates, isolates). That part explains what pattern was found.`,
    `Use the ending clause as the decision signal. It should tell you what action a stakeholder should take and why it matters.`,
    `Cross-check repeated terms across bullets (for example: ${secondKeyword}) to identify the strongest theme, then prioritize that theme in your summary.`
  ];

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <MenuBookIcon sx={{ color: accent }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: accent }}>
          {sectionTitle}
        </Typography>
      </Box>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
        {guideBullets.map((item, index) => (
          <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < guideBullets.length - 1 ? 1.4 : 0 }}>
            <Typography variant="body2" sx={{ color: accent, fontWeight: 800, minWidth: 24 }}>
              {index + 1}.
            </Typography>
            <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", lineHeight: 1.6 }}>
              {item}
            </Typography>
          </Box>
        ))}
      </Paper>
    </>
  );
}
