import { streamAsk } from "./src/streamingClientExample.js";

const apiBaseUrlEl = document.getElementById("apiBaseUrl");
const userIdEl = document.getElementById("userId");
const questionEl = document.getElementById("question");
const sourceFiltersEl = document.getElementById("sourceFilters");
const autoRouteSourcesEl = document.getElementById("autoRouteSources");
const answerOutputEl = document.getElementById("answerOutput");
const citationListEl = document.getElementById("citationList");
const routingOutputEl = document.getElementById("routingOutput");
const statusOutputEl = document.getElementById("statusOutput");

const askButton = document.getElementById("askButton");
const judgeButton = document.getElementById("judgeButton");
const clearButton = document.getElementById("clearButton");

function setStatus(message) {
  statusOutputEl.textContent = message;
}

function resetOutput() {
  answerOutputEl.textContent = "";
  citationListEl.innerHTML = "";
  routingOutputEl.textContent = "No routing metadata yet.";
}

function renderRouting(metadata) {
  const routedSources = metadata.routed_sources || [];
  const appliedSourceFilters = metadata.applied_source_filters || [];
  routingOutputEl.textContent = JSON.stringify(
    {
      routed_sources: routedSources,
      applied_source_filters: appliedSourceFilters,
    },
    null,
    2
  );
}

function renderCitations(citations) {
  citationListEl.innerHTML = "";
  for (const citation of citations || []) {
    const item = document.createElement("li");
    item.textContent = `${citation.title} (${citation.source}) score=${citation.score}`;
    citationListEl.appendChild(item);
  }
}

askButton.addEventListener("click", async () => {
  resetOutput();
  askButton.disabled = true;
  setStatus("Streaming...");

  const sourceFilters = sourceFiltersEl.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  try {
    await streamAsk({
      apiBaseUrl: apiBaseUrlEl.value.trim(),
      payload: {
        question: questionEl.value.trim(),
        user_id: userIdEl.value.trim() || "demo-user",
        experiment_variant: "baseline",
        source_filters: sourceFilters,
        auto_route_sources: autoRouteSourcesEl.checked,
      },
      onToken: (text) => {
        answerOutputEl.textContent += text;
      },
      onMetadata: (metadata) => {
        renderCitations(metadata.citations || []);
        renderRouting(metadata);
      },
      onBlocked: (reason) => {
        setStatus(`Blocked: ${reason}`);
      },
      onDone: () => {
        setStatus("Done.");
      },
    });
  } catch (error) {
    setStatus(`Error: ${error.message}`);
  } finally {
    askButton.disabled = false;
  }
});

judgeButton.addEventListener("click", async () => {
  judgeButton.disabled = true;
  setStatus("Running /eval/judge...");

  try {
    const response = await fetch(`${apiBaseUrlEl.value.trim()}/eval/judge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cases: [
          {
            question: questionEl.value.trim(),
            expected_keywords: ["complaint", "status", "agency"],
          },
        ],
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(payload));
    }

    setStatus(
      `Judge complete: overall=${payload.avg_overall_score}, model=${payload.judge_model}, llm=${payload.used_llm_judge}`
    );
  } catch (error) {
    setStatus(`Judge error: ${error.message}`);
  } finally {
    judgeButton.disabled = false;
  }
});

clearButton.addEventListener("click", () => {
  resetOutput();
  setStatus("Cleared.");
});
