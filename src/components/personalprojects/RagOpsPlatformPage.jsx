import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HubIcon from "@mui/icons-material/Hub";
import InsightsIcon from "@mui/icons-material/Insights";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RouteIcon from "@mui/icons-material/AltRoute";
import SourceIcon from "@mui/icons-material/Source";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

const DEMO_CASES = [
  {
    id: "nyc",
    label: "Civic Ops",
    question: "What are the biggest recurring NYC 311 complaint patterns across Brooklyn and Queens?",
    routedSources: ["nyc_311"],
    appliedFilters: ["nyc_311"],
    citations: [
      { title: "NYC 311 - Noise Complaints", source: "nyc_311", score: 0.94 },
      { title: "NYC 311 - Sanitation Trends", source: "nyc_311", score: 0.89 },
      { title: "NYC 311 - Borough Service Volume", source: "nyc_311", score: 0.83 },
    ],
    metrics: {
      latency: "842 ms",
      evaluation: "0.91",
      retrievalMode: "tf-idf",
      streamTokens: 118,
    },
    answer:
      "Brooklyn and Queens show the strongest repeat complaint concentration in noise, sanitation, and street-condition categories. Brooklyn trends heavier toward residential noise and sanitation volume, while Queens shows broader spread across street-condition and maintenance requests. In an operational setting, this lets the team prioritize borough-specific staffing plans, route recurring complaint types to the right agency faster, and monitor whether service backlogs are building in the same neighborhoods week over week.",
  },
  {
    id: "sec",
    label: "Company Facts",
    question: "Summarize revenue, liabilities, and balance-sheet signals from the SEC source.",
    routedSources: ["sec_companyfacts"],
    appliedFilters: ["sec_companyfacts"],
    citations: [
      { title: "SEC CompanyFacts - Revenue", source: "sec_companyfacts", score: 0.96 },
      { title: "SEC CompanyFacts - Liabilities", source: "sec_companyfacts", score: 0.91 },
      { title: "SEC CompanyFacts - Balance Sheet", source: "sec_companyfacts", score: 0.88 },
    ],
    metrics: {
      latency: "1.12 s",
      evaluation: "0.94",
      retrievalMode: "pgvector",
      streamTokens: 132,
    },
    answer:
      "The SEC route surfaces structured financial disclosures so the answer stays grounded in reported company facts instead of generic model recall. In this sample, revenue trends remain the lead narrative, liabilities provide the balance-sheet pressure signal, and the response combines both into a compact operating summary. This kind of flow is useful when a user wants quick finance-aware answers without manually reading multiple filings and fact tables.",
  },
  {
    id: "cross-source",
    label: "Cross-Source Brief",
    question: "Create a short operational brief using both NYC 311 complaints and Chicago crime patterns.",
    routedSources: ["nyc_311", "chicago_crimes"],
    appliedFilters: ["nyc_311", "chicago_crimes"],
    citations: [
      { title: "NYC 311 - Complaint Volume", source: "nyc_311", score: 0.9 },
      { title: "Chicago Crime - District Trends", source: "chicago_crimes", score: 0.87 },
      { title: "Chicago Crime - Arrest Rates", source: "chicago_crimes", score: 0.82 },
    ],
    metrics: {
      latency: "1.34 s",
      evaluation: "0.89",
      retrievalMode: "hybrid routing",
      streamTokens: 141,
    },
    answer:
      "The platform can route across more than one source when the question spans multiple domains. Here it pulls 311 complaint patterns for civic-service demand and combines them with public-safety trend summaries from Chicago crime data. The result is a compact brief that shows where service demand, maintenance issues, or safety signals appear to cluster, giving leaders one place to review cross-source operational context instead of stitching it together manually.",
  },
];

const VALUE_POINTS = [
  {
    title: "Ingest",
    body: "Loads difficult public datasets into a retrieval layer so the app answers from curated evidence instead of raw model memory.",
  },
  {
    title: "Route",
    body: "Detects what the user is asking about and narrows retrieval to the right source set before generation starts.",
  },
  {
    title: "Explain",
    body: "Streams the answer, shows citations, and exposes routing + evaluation metadata so users can trust what they are seeing.",
  },
];

function useStreamingText(fullText, activeKey) {
  const [visibleText, setVisibleText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!fullText) {
      setVisibleText("");
      setIsStreaming(false);
      return;
    }

    setVisibleText("");
    setIsStreaming(true);

    const words = fullText.split(" ");
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(words.slice(0, index).join(" "));
      if (index >= words.length) {
        window.clearInterval(timer);
        setIsStreaming(false);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [fullText, activeKey]);

  return { visibleText, isStreaming };
}

export default function RagOpsPlatformPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const project = personalProjects.find((item) => item.id === "rag-ops-platform");
  const [selectedCaseId, setSelectedCaseId] = useState(DEMO_CASES[0].id);
  const [question, setQuestion] = useState(DEMO_CASES[0].question);
  const [autoRoute, setAutoRoute] = useState(true);

  const activeCase = useMemo(
    () => DEMO_CASES.find((item) => item.id === selectedCaseId) || DEMO_CASES[0],
    [selectedCaseId]
  );

  const [runKey, setRunKey] = useState(0);
  const { visibleText, isStreaming } = useStreamingText(activeCase.answer, `${selectedCaseId}-${runKey}`);

  useEffect(() => {
    setQuestion(activeCase.question);
  }, [activeCase]);

  const accent = darkMode ? "#90caf9" : "#1976d2";
  const secondaryAccent = darkMode ? "#86efac" : "#15803d";
  const cardBg = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";

  const handleRunDemo = () => {
    setRunKey((value) => value + 1);
  };

  return (
    <Box
      className="personal-projects-page"
      sx={{
        minHeight: "100vh",
        pt: 10,
        pb: 6,
        px: { xs: 2, md: 6 },
        color: darkMode ? "#f5f5f5" : "#222",
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Button
          component={Link}
          to="/personal-projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Personal Projects
        </Button>

        <Box sx={{ textAlign: "center", mb: 5 }}>
          <HubIcon sx={{ fontSize: 52, color: accent, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            {project.title}
          </Typography>
          <Typography variant="h6" sx={{ color: accent, fontWeight: 600, mb: 2 }}>
            {project.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 860, mx: "auto", color: darkMode ? "#bbb" : "#555", lineHeight: 1.75 }}
          >
            This app turns fragmented operational and financial datasets into a live question-answering workspace. Users can ask for service trends, company fact summaries, or cross-source operational briefs, and the system retrieves the relevant evidence, streams a grounded answer, and shows exactly which sources supported the response.
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              View on GitHub
            </Button>
            <Chip
              label={project.status}
              sx={{
                fontWeight: 700,
                bgcolor: darkMode ? "#1f2937" : "#e8f0fe",
                color: darkMode ? "#93c5fd" : "#1d4ed8",
                border: darkMode ? "1px solid #334155" : "1px solid #bfdbfe",
              }}
            />
          </Box>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            background: darkMode
              ? "linear-gradient(145deg, rgba(17,24,39,0.95) 0%, rgba(42,42,42,0.98) 100%)"
              : "linear-gradient(145deg, rgba(240,247,255,0.98) 0%, rgba(255,255,255,0.98) 100%)",
            border: cardBorder,
            mb: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <InsightsIcon sx={{ color: accent }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: accent }}>
              Interactive Product Demo
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", mb: 3 }}>
            Choose a scenario, edit the prompt, and replay the response stream. The demo mirrors the real product behavior: source routing, evidence-backed answers, citations, and operational metrics.
          </Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Paper elevation={0} sx={{ flex: 1, p: 2.5, borderRadius: 3, background: cardBg, border: cardBorder }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5 }}>
                Scenario Library
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mb: 2.5 }}>
                {DEMO_CASES.map((item) => (
                  <Chip
                    key={item.id}
                    label={item.label}
                    clickable
                    onClick={() => setSelectedCaseId(item.id)}
                    sx={{
                      fontWeight: 700,
                      bgcolor: selectedCaseId === item.id ? (darkMode ? "#0f3d62" : "#dbeafe") : (darkMode ? "#333" : "#f8fafc"),
                      color: selectedCaseId === item.id ? (darkMode ? "#bae6fd" : "#1d4ed8") : (darkMode ? "#e2e8f0" : "#334155"),
                      border: selectedCaseId === item.id ? `1px solid ${accent}` : (darkMode ? "1px solid #475569" : "1px solid #dbe4f0"),
                    }}
                  />
                ))}
              </Stack>

              <TextField
                label="Ask the app"
                multiline
                minRows={4}
                fullWidth
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                sx={{ mb: 2 }}
              />

              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
                <Switch checked={autoRoute} onChange={(event) => setAutoRoute(event.target.checked)} />
                <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569" }}>
                  Auto-route sources before retrieval
                </Typography>
              </Stack>

              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={handleRunDemo}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                Replay Interactive Demo
              </Button>
            </Paper>

            <Paper elevation={0} sx={{ flex: 1.2, p: 2.5, borderRadius: 3, background: cardBg, border: cardBorder }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Streaming Answer
                </Typography>
                <Chip
                  label={isStreaming ? "Streaming" : "Complete"}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    bgcolor: isStreaming ? (darkMode ? "#3b2f0d" : "#fef3c7") : (darkMode ? "#14361f" : "#dcfce7"),
                    color: isStreaming ? (darkMode ? "#fde68a" : "#92400e") : (darkMode ? "#86efac" : "#166534"),
                  }}
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  minHeight: 220,
                  borderRadius: 2,
                  bgcolor: darkMode ? "#111827" : "#f8fbff",
                  border: darkMode ? "1px solid #334155" : "1px solid #dbeafe",
                  mb: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: darkMode ? "#e2e8f0" : "#1f2937", lineHeight: 1.7 }}>
                  {visibleText || "Press replay to stream a grounded answer from the selected scenario."}
                </Typography>
              </Paper>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Chip icon={<RouteIcon />} label={`Routed: ${autoRoute ? activeCase.routedSources.join(", ") : "manual mode"}`} sx={{ fontWeight: 700 }} />
                <Chip icon={<SourceIcon />} label={`Citations: ${activeCase.citations.length}`} sx={{ fontWeight: 700 }} />
                <Chip icon={<VerifiedIcon />} label={`Eval score: ${activeCase.metrics.evaluation}`} sx={{ fontWeight: 700 }} />
              </Stack>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 1.2 }}>
                {[
                  { label: "Latency", value: activeCase.metrics.latency },
                  { label: "Retrieval", value: activeCase.metrics.retrievalMode },
                  { label: "Tokens", value: activeCase.metrics.streamTokens },
                  { label: "Sources", value: activeCase.appliedFilters.length },
                ].map((item) => (
                  <Paper key={item.label} elevation={0} sx={{ p: 1.4, borderRadius: 2, background: darkMode ? "#161616" : "#f8fafc", border: cardBorder }}>
                    <Typography variant="caption" sx={{ color: darkMode ? "#94a3b8" : "#64748b", display: "block" }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: darkMode ? "#f8fafc" : "#0f172a" }}>
                      {item.value}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Stack>
        </Paper>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" }, gap: 3, mb: 5 }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              What the App Does
            </Typography>
            <Stack spacing={2}>
              {VALUE_POINTS.map((item, index) => (
                <Box key={item.title} sx={{ display: "flex", gap: 1.5 }}>
                  <Typography sx={{ color: accent, fontWeight: 800, minWidth: 24 }}>{index + 1}.</Typography>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.4 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", lineHeight: 1.65 }}>
                      {item.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Live Evidence Panel
            </Typography>
            <Stack spacing={1.2} sx={{ mb: 2.5 }}>
              {activeCase.citations.map((citation) => (
                <Paper key={citation.title} elevation={0} sx={{ p: 1.4, borderRadius: 2, background: darkMode ? "#151515" : "#f8fafc", border: cardBorder }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.4 }}>
                    {citation.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
                    {citation.source} · relevance {citation.score}
                  </Typography>
                </Paper>
              ))}
            </Stack>

            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
              Applied source filters
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              {(autoRoute ? activeCase.appliedFilters : ["manual selection"]).map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    fontWeight: 700,
                    bgcolor: darkMode ? "#14361f" : "#ecfdf5",
                    color: secondaryAccent,
                    border: darkMode ? "1px solid #166534" : "1px solid #bbf7d0",
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Box>

        <Divider sx={{ mb: 5, borderColor: darkMode ? "#444" : "#e0e0e0" }} />

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Tech Stack
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
          {project.tech.map((item) => (
            <Chip
              key={item}
              label={item}
              sx={{
                fontWeight: 600,
                bgcolor: darkMode ? "#333" : "#e3f2fd",
                color: darkMode ? "#90caf9" : "#1565c0",
                border: darkMode ? "1px solid #555" : "1px solid #bbdefb",
              }}
            />
          ))}
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
          Core Capabilities
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
          {project.highlights.map((item, index) => (
            <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < project.highlights.length - 1 ? 1.5 : 0 }}>
              <Typography variant="body2" sx={{ color: accent, fontWeight: 800, minWidth: 24 }}>
                {index + 1}.
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}