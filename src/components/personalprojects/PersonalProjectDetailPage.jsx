import { useContext, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box, Typography, Paper, Chip, Button, Divider, TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ScienceIcon from "@mui/icons-material/Science";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "../../context";
import { personalProjects } from "../../data";
import "./personalProjects.scss";

export default function PersonalProjectDetailPage() {
  const { projectId } = useParams();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const project = personalProjects.find((item) => item.id === projectId);
  const isAgenticCopilotProject = project?.id === "agentic-claims-communication-copilot";
  const [draftScenario, setDraftScenario] = useState("FNOL status and policy question");
  const [draftCustomerMessage, setDraftCustomerMessage] = useState(
    "Hi, I filed a claim yesterday and need to confirm status and whether rental coverage is included."
  );
  const [scenario, setScenario] = useState("FNOL status and policy question");
  const [customerMessage, setCustomerMessage] = useState(
    "Hi, I filed a claim yesterday and need to confirm status and whether rental coverage is included."
  );

  const workflowPreview = useMemo(() => {
    const lower = customerMessage.toLowerCase();
    const highUrgency = /(injury|attorney|lawsuit|fraud|escalate|urgent)/.test(lower);
    const hasCoverageQuestion = /(coverage|covered|policy|deductible|rental)/.test(lower);
    const hasStatusQuestion = /(status|update|claim|filed|progress)/.test(lower);

    const intent = hasCoverageQuestion && hasStatusQuestion
      ? "Claim Status + Coverage Clarification"
      : hasCoverageQuestion
        ? "Coverage Clarification"
        : hasStatusQuestion
          ? "Claim Status Inquiry"
          : "General Service Inquiry";

    const riskLevel = highUrgency ? "High" : "Standard";
    const route = highUrgency ? "Senior Adjuster + Agent Handoff" : "Copilot Assisted Response";

    return {
      intent,
      riskLevel,
      route,
      steps: [
        `Triage intent for scenario: ${scenario}`,
        "Retrieve claim context, policy terms, and communication history",
        "Generate grounded draft response with explicit confidence and source references",
        highUrgency
          ? "Escalate to human reviewer with priority tag and rationale"
          : "Run policy compliance checks and queue agent review",
      ],
    };
  }, [customerMessage, scenario]);

  if (!project) {
    return (
      <Box sx={{ minHeight: "100vh", pt: 12, px: 3, color: darkMode ? "#f5f5f5" : "#222" }}>
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Project not found
          </Typography>
          <Button component={Link} to="/personal-projects" variant="contained" sx={{ textTransform: "none" }}>
            Back to Personal Projects
          </Button>
        </Box>
      </Box>
    );
  }

  const accent = darkMode ? "#90caf9" : "#1976d2";
  const cardBg = darkMode ? "#2a2a2a" : "#fff";
  const cardBorder = darkMode ? "1px solid #444" : "1px solid #e3f0ff";
  const liveDemoUrl = project.liveDemo;

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
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Button
          component={Link}
          to="/personal-projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, textTransform: "none" }}
        >
          Back to Personal Projects
        </Button>

        <Box sx={{ textAlign: "center", mb: 5 }}>
          <ScienceIcon sx={{ fontSize: 48, color: accent, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            {project.title}
          </Typography>
          <Typography variant="h6" sx={{ color: accent, fontWeight: 600, mb: 2 }}>
            {project.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 760, mx: "auto", color: darkMode ? "#bbb" : "#555", lineHeight: 1.7 }}
          >
            {project.description}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            {project.github && (
              <Button
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<GitHubIcon />}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                View on GitHub
              </Button>
            )}
            {liveDemoUrl && (
              <Button
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Open Live App
              </Button>
            )}
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
          Skills Showcased
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
          {project.skillsShowcased.map((item) => (
            <Chip
              key={item}
              label={item}
              sx={{
                fontWeight: 600,
                bgcolor: darkMode ? "#1b5e20" : "#e8f5e9",
                color: darkMode ? "#81c784" : "#2e7d32",
                border: darkMode ? "1px solid #388e3c" : "1px solid #a5d6a7",
              }}
            />
          ))}
        </Box>

        {project.highlights && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Project Scope
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              {project.highlights.map((item, index) => (
                <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < project.highlights.length - 1 ? 1.5 : 0 }}>
                  <CheckCircleIcon sx={{ color: accent, fontSize: 20, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}

        {project.architectureFlow && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Architecture Flow
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1.5, alignItems: "stretch" }}>
                {project.architectureFlow.map((step, index) => (
                  <Box key={step.stage} sx={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                    <Box
                      sx={{
                        flex: 1,
                        p: 2,
                        borderRadius: 2,
                        border: darkMode ? "1px solid #475569" : "1px solid #bfdbfe",
                        bgcolor: darkMode ? "rgba(30,41,59,0.65)" : "rgba(239,246,255,0.9)",
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, color: accent, letterSpacing: 0.3 }}>
                        {step.stage}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.4, mb: 0.8, color: darkMode ? "#e2e8f0" : "#1e293b" }}>
                        {step.layer}
                      </Typography>
                      <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", lineHeight: 1.55 }}>
                        {step.detail}
                      </Typography>
                    </Box>
                    {index < project.architectureFlow.length - 1 && (
                      <Typography sx={{ alignSelf: "center", px: 1, color: accent, fontWeight: 700, display: { xs: "none", md: "block" } }}>
                        -&gt;
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          </>
        )}

        {project.recruiterSignals && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Recruiter Signal
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              {project.recruiterSignals.map((item, index) => (
                <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < project.recruiterSignals.length - 1 ? 1.5 : 0 }}>
                  <Typography variant="body2" sx={{ color: accent, fontWeight: 700, minWidth: 24 }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}

        {project.deliverables && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Planned Deliverables
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              {project.deliverables.map((item, index) => (
                <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: index < project.deliverables.length - 1 ? 1.5 : 0 }}>
                  <Typography variant="body2" sx={{ color: accent, fontWeight: 700, minWidth: 24 }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444", lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}

        {isAgenticCopilotProject && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Interactive Workflow Simulator
            </Typography>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#475569", mb: 2, lineHeight: 1.6 }}>
                This on-page simulator demonstrates the agentic triage and routing pattern used in the project narrative.
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? "#94a3b8" : "#64748b", mb: 2, lineHeight: 1.6 }}>
                Enter a scenario and customer message, then click Run Simulation to update Intent, Risk, and Route.
                Keywords like "injury", "lawsuit", or "fraud" drive the High risk path.
              </Typography>

              <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
                <TextField
                  label="Scenario"
                  value={draftScenario}
                  onChange={(event) => setDraftScenario(event.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Customer Message"
                  value={draftCustomerMessage}
                  onChange={(event) => setDraftCustomerMessage(event.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", fontWeight: 700 }}
                    onClick={() => {
                      setScenario(draftScenario.trim() || "General service inquiry");
                      setCustomerMessage(
                        draftCustomerMessage.trim() || "Customer is asking for claim help and policy clarification."
                      );
                    }}
                  >
                    Run Simulation
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Chip label={`Intent: ${workflowPreview.intent}`} sx={{ fontWeight: 700 }} />
                <Chip label={`Risk: ${workflowPreview.riskLevel}`} sx={{ fontWeight: 700 }} color={workflowPreview.riskLevel === "High" ? "warning" : "success"} />
                <Chip label={`Route: ${workflowPreview.route}`} sx={{ fontWeight: 700 }} color="primary" />
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: accent, mb: 1 }}>
                Workflow Steps
              </Typography>
              {workflowPreview.steps.map((step, index) => (
                <Box key={step} sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 1 }}>
                  <Typography variant="body2" sx={{ color: accent, fontWeight: 700, minWidth: 20 }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#e2e8f0" : "#334155", lineHeight: 1.55 }}>
                    {step}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}

        {liveDemoUrl && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: accent, mb: 2 }}>
              Live Dashboard
            </Typography>
            <Paper elevation={2} sx={{ p: 1.5, borderRadius: 3, background: cardBg, border: cardBorder, mb: 5 }}>
              <Box
                component="iframe"
                title={`${project.title} Live Dashboard`}
                src={`${liveDemoUrl}${liveDemoUrl.includes("?") ? "&" : "?"}embed=true`}
                sx={{
                  width: "100%",
                  height: { xs: 500, md: 700 },
                  border: 0,
                  borderRadius: 2,
                  background: darkMode ? "#111" : "#fff",
                }}
              />
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}