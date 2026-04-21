import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

const RAG_API_BASE_URL = process.env.REACT_APP_RAG_OPS_API_URL?.trim() || "";

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

function buildDemoMetricCards(activeCase) {
  return [
    { label: "Latency", value: activeCase.metrics.latency },
    { label: "Retrieval", value: activeCase.metrics.retrievalMode },
    { label: "Tokens", value: activeCase.metrics.streamTokens },
    { label: "Sources", value: activeCase.appliedFilters.length },
  ];
}

function buildLiveMetricCards(metrics) {
  return [
    { label: "Ask requests", value: metrics?.["ask_stream.count"] ?? metrics?.["ask.count"] ?? "-" },
    {
      label: "Avg latency",
      value: metrics?.["ask_stream.latency_avg_s"]
        ? `${metrics["ask_stream.latency_avg_s"]} s`
        : metrics?.["ask.latency_avg_s"]
          ? `${metrics["ask.latency_avg_s"]} s`
          : "-",
    },
    { label: "Tokens est.", value: metrics?.["tokens.estimated_total"] ?? "-" },
    {
      label: "Est. cost",
      value: typeof metrics?.["cost.estimated_usd"] === "number" ? `$${metrics["cost.estimated_usd"]}` : "-",
    },
  ];
}

export default function RagOpsPlatformPage() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const project = personalProjects.find((item) => item.id === "rag-ops-platform");
  const [selectedCaseId, setSelectedCaseId] = useState(DEMO_CASES[0].id);
  const [question, setQuestion] = useState(DEMO_CASES[0].question);
  const [sourceFilters, setSourceFilters] = useState(DEMO_CASES[0].appliedFilters.join(", "));
  const [autoRoute, setAutoRoute] = useState(true);
  const [answerText, setAnswerText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [citations, setCitations] = useState([]);
  const [routedSources, setRoutedSources] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [statusText, setStatusText] = useState("Checking app mode...");
  const [connection, setConnection] = useState({ mode: RAG_API_BASE_URL ? "checking" : "demo", environment: null, reason: null });
  const demoTimerRef = useRef(null);

  const activeCase = useMemo(
    () => DEMO_CASES.find((item) => item.id === selectedCaseId) || DEMO_CASES[0],
    [selectedCaseId]
  );

  useEffect(() => {
    setQuestion(activeCase.question);
    setSourceFilters(activeCase.appliedFilters.join(", "));
  }, [activeCase]);

  useEffect(() => {
    let isCancelled = false;

    async function bootstrapLiveMode() {
      if (!RAG_API_BASE_URL) {
        setConnection({ mode: "demo", environment: null, reason: "No API URL configured" });
        setStatusText("Demo mode: set REACT_APP_RAG_OPS_API_URL to connect the live backend.");
        return;
      }

      try {
        const healthResponse = await fetch(`${RAG_API_BASE_URL}/health`);
        if (!healthResponse.ok) {
          throw new Error(`Health check failed (${healthResponse.status})`);
        }
        const health = await healthResponse.json();
        if (isCancelled) return;

        setConnection({ mode: "live", environment: health.environment || "unknown", reason: null });
        setStatusText(`Live mode connected${health.environment ? ` (${health.environment})` : ""}.`);

        try {
          const metricsResponse = await fetch(`${RAG_API_BASE_URL}/metrics`);
          if (metricsResponse.ok) {
            const snapshot = await metricsResponse.json();
            if (!isCancelled) {
              setMetrics(snapshot);
            }
          }
        } catch {
          // Metrics are optional for page load.
        }
      } catch (error) {
        if (isCancelled) return;
        setConnection({ mode: "demo", environment: null, reason: error.message });
        setStatusText("Demo mode: live API is unavailable, showing the interactive fallback experience.");
      }
    }

    bootstrapLiveMode();
    return () => {
      isCancelled = true;
    };
  }, []);

  const accent = darkMode ? "#90caf9" : "#1976d2";
  const secondaryAccent = darkMode ? "#86efac" : "#15803d";
  const cardBg = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";

  const clearDemoTimer = () => {
    if (demoTimerRef.current) {
      window.clearInterval(demoTimerRef.current);
      demoTimerRef.current = null;
    }
  };

  const loadMetrics = async () => {
    if (connection.mode !== "live") return;

    try {
      const metricsResponse = await fetch(`${RAG_API_BASE_URL}/metrics`);
      if (!metricsResponse.ok) return;
      const snapshot = await metricsResponse.json();
      setMetrics(snapshot);
    } catch {
      // Non-blocking.
    }
  };

  const handleRunDemo = async () => {
    clearDemoTimer();
    setAnswerText("");
    setCitations([]);
    setRoutedSources([]);
    setAppliedFilters([]);

    if (connection.mode === "live") {
      setIsStreaming(true);
      setStatusText("Streaming live answer from backend...");

      try {
        const response = await fetch(`${RAG_API_BASE_URL}/ask/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: question.trim(),
            user_id: "portfolio-demo",
            experiment_variant: "baseline",
            source_filters: sourceFilters
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
            auto_route_sources: autoRoute,
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error(`Streaming request failed (${response.status}).`);
        }

        const decoder = new TextDecoder();
        const reader = response.body.getReader();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split("\n\n");
          buffer = frames.pop() || "";

          for (const frame of frames) {
            let eventName = "message";
            let data = "{}";

            for (const line of frame.split("\n")) {
              if (line.startsWith("event:")) {
                eventName = line.slice("event:".length).trim();
              } else if (line.startsWith("data:")) {
                data = line.slice("data:".length).trim();
              }
            }

            let parsed;
            try {
              parsed = JSON.parse(data);
            } catch {
              continue;
            }

            if (eventName === "token") {
              setAnswerText((current) => current + (parsed.text || ""));
            }
            if (eventName === "metadata") {
              setCitations(parsed.citations || []);
              setRoutedSources(parsed.routed_sources || []);
              setAppliedFilters(parsed.applied_source_filters || []);
            }
            if (eventName === "blocked") {
              setStatusText(`Blocked by guardrails: ${parsed.reason || "Request blocked."}`);
            }
            if (eventName === "done") {
              setStatusText("Live answer complete.");
            }
          }
        }

        await loadMetrics();
      } catch (error) {
        setStatusText(`Live mode error: ${error.message}. Falling back to demo preview.`);
        setConnection({ mode: "demo", environment: null, reason: error.message });
      } finally {
        setIsStreaming(false);
      }

      return;
    }

    setIsStreaming(true);
    setStatusText("Streaming demo answer...");
    const words = activeCase.answer.split(" ");
    let index = 0;

    demoTimerRef.current = window.setInterval(() => {
      index += 1;
      setAnswerText(words.slice(0, index).join(" "));

      if (index >= words.length) {
        clearDemoTimer();
        setIsStreaming(false);
        setCitations(activeCase.citations);
        setRoutedSources(activeCase.routedSources);
        setAppliedFilters(autoRoute ? activeCase.appliedFilters : ["manual selection"]);
        setStatusText("Demo answer complete.");
      }
    }, 28);
  };

  useEffect(() => () => clearDemoTimer(), []);

  const metricCards = connection.mode === "live"
    ? buildLiveMetricCards(metrics)
    : buildDemoMetricCards(activeCase);

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
            Choose a scenario, edit the prompt, and run the app. When a backend URL is configured, this panel uses the real API for health checks, streaming answers, citations, and telemetry. Otherwise it falls back to a fully interactive demo preview.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
            <Chip
              icon={connection.mode === "live" ? <CloudDoneIcon /> : <CloudOffIcon />}
              label={connection.mode === "live" ? `Live API Connected${connection.environment ? ` · ${connection.environment}` : ""}` : "Interactive Demo Mode"}
              sx={{ fontWeight: 700 }}
            />
            {RAG_API_BASE_URL ? (
              <Chip label={`API: ${RAG_API_BASE_URL}`} sx={{ fontWeight: 700 }} />
            ) : null}
          </Stack>

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

              <TextField
                label="Source filters (comma-separated, optional)"
                fullWidth
                value={sourceFilters}
                onChange={(event) => setSourceFilters(event.target.value)}
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
                disabled={isStreaming}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                {connection.mode === "live" ? "Run Live Query" : "Replay Interactive Demo"}
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
                  {answerText || "Run the app to stream a grounded answer from the selected scenario."}
                </Typography>
              </Paper>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Chip icon={<RouteIcon />} label={`Routed: ${(routedSources.length ? routedSources : (autoRoute ? activeCase.routedSources : ["manual mode"])).join(", ")}`} sx={{ fontWeight: 700 }} />
                <Chip icon={<SourceIcon />} label={`Citations: ${(citations.length || activeCase.citations.length)}`} sx={{ fontWeight: 700 }} />
                <Chip icon={<VerifiedIcon />} label={connection.mode === "live" ? "Live retrieval" : `Eval score: ${activeCase.metrics.evaluation}`} sx={{ fontWeight: 700 }} />
              </Stack>

              <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", mb: 2 }}>
                {statusText}
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 1.2 }}>
                {metricCards.map((item) => (
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

              {connection.mode === "live" ? (
                <Button
                  variant="text"
                  startIcon={<RefreshIcon />}
                  onClick={loadMetrics}
                  sx={{ mt: 1.5, textTransform: "none", fontWeight: 700 }}
                >
                  Refresh live metrics
                </Button>
              ) : null}
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
              {(citations.length ? citations : activeCase.citations).map((citation) => (
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
              {(appliedFilters.length ? appliedFilters : (autoRoute ? activeCase.appliedFilters : ["manual selection"])).map((item) => (
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