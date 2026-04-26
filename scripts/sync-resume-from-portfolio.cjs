#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const dataPath = path.join(repoRoot, "src", "data.js");
const resumeMdPath = path.join(repoRoot, "resume", "Arie_Resume_general.md");
const resumePdfPath = path.join(repoRoot, "public", "Arie_Resume_general.pdf");

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "your", "their", "into", "across", "through",
  "using", "used", "where", "when", "while", "able", "work", "works", "role", "team", "build", "built",
  "have", "has", "are", "was", "were", "been", "being", "also", "over", "than", "most", "more", "less",
  "high", "low", "core", "strong", "focus", "current", "across", "deliver", "delivering", "driven",
]);

const TECH_SIGNAL_WORDS = [
  "python", "sql", "streamlit", "llm", "rag", "langchain", "langgraph", "api", "fastapi", "orchestration",
  "evaluation", "monitoring", "mlops", "deep learning", "scikit", "xgboost", "vector", "embeddings",
  "window functions", "pipeline", "data model", "docker", "cloud run", "ci/cd", "kafka", "terraform",
  "bigquery", "snowflake", "plotly", "pandas", "numpy", "governance", "reliability", "observability",
];

function parsePortfolioData(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const sanitized = source
    .replace(/export\s+const\s+/g, "const ")
    .replace(/export\s+default\s+[\s\S]*?;\s*$/gm, "");

  const evaluator = new Function(
    "require",
    `"use strict";\n${sanitized}\nreturn { personalProjects, experience };`
  );

  return evaluator(require);
}

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function unique(arr) {
  return [...new Set(arr)];
}

function getRoleTerms(experience) {
  if (!Array.isArray(experience) || experience.length === 0) {
    return ["python", "sql", "analytics", "machine", "learning", "data"];
  }

  const current = experience[0] || {};
  const roleText = [
    current.role,
    current.team,
    current.summary,
    ...(Array.isArray(current.highlights) ? current.highlights : []),
    ...(Array.isArray(current.tech) ? current.tech : []),
  ]
    .filter(Boolean)
    .join(" ");

  const terms = tokenize(roleText);
  const freq = new Map();
  for (const term of terms) {
    freq.set(term, (freq.get(term) || 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 35)
    .map(([term]) => term);
}

function projectText(project) {
  return [
    project.title,
    project.subtitle,
    project.description,
    ...(project.tech || []),
    ...(project.skillsShowcased || []),
    ...(project.highlights || []),
    ...(project.recruiterSignals || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function scoreProject(project, roleTerms) {
  const text = projectText(project);
  const techCount = Array.isArray(project.tech) ? project.tech.length : 0;
  const skillsCount = Array.isArray(project.skillsShowcased) ? project.skillsShowcased.length : 0;
  const highlightsCount = Array.isArray(project.highlights) ? project.highlights.length : 0;

  let roleMatch = 0;
  for (const term of roleTerms) {
    if (text.includes(term)) roleMatch += 1;
  }

  let technicalSignals = 0;
  for (const signal of TECH_SIGNAL_WORDS) {
    if (text.includes(signal)) technicalSignals += 1;
  }

  const statusBonus = project.status === "Complete" ? 2 : 0;
  const categoryBonus = project.category === "data-science" ? 1 : 0;

  const depthScore = (Math.min(techCount, 14) * 1.8) + (Math.min(skillsCount, 10) * 1.3) + (Math.min(highlightsCount, 8) * 1.1);
  const relevanceScore = roleMatch * 1.4;
  const technicalScore = technicalSignals * 1.6;

  return depthScore + relevanceScore + technicalScore + statusBonus + categoryBonus;
}

function trimSentence(text, maxLen = 150) {
  if (!text) return "";
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= maxLen) return clean;
  return `${clean.slice(0, maxLen - 1).trim()}...`;
}

function pickTopProjects(personalProjects, experience, limit = 3) {
  const roleTerms = getRoleTerms(experience);

  const ranked = personalProjects
    .filter((project) => project && project.title && Array.isArray(project.highlights) && project.highlights.length > 0)
    .map((project) => ({ project, score: scoreProject(project, roleTerms) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.project);

  const uniqueRanked = [];
  const seen = new Set();
  for (const proj of ranked) {
    if (!seen.has(proj.id)) {
      uniqueRanked.push(proj);
      seen.add(proj.id);
    }
  }

  return uniqueRanked;
}

function buildProjectsSection(topProjects) {
  const lines = ["## PROJECTS"];

  for (const project of topProjects) {
    const bullets = unique((project.highlights || []).slice(0, 2)).map((item) => `- ${trimSentence(item, 165)}`);
    lines.push(`**${project.title}**`);
    lines.push(...bullets);
    lines.push(`- Tech: ${(project.tech || []).slice(0, 7).join(", ")}`);
    lines.push("");
  }

  return lines.join("\n").trim();
}

function syncResumeMarkdown() {
  const { personalProjects, experience } = parsePortfolioData(dataPath);
  const resume = fs.readFileSync(resumeMdPath, "utf8");

  const topProjects = pickTopProjects(personalProjects || [], experience || [], 3);
  if (topProjects.length === 0) {
    throw new Error("Could not identify projects to populate resume section.");
  }

  const projectsSection = buildProjectsSection(topProjects);

  const startTag = "## PROJECTS";
  const endTag = "## EDUCATION";

  const startIndex = resume.indexOf(startTag);
  const endIndex = resume.indexOf(endTag);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Could not find PROJECTS/EDUCATION sections in resume markdown.");
  }

  const before = resume.slice(0, startIndex).trimEnd();
  const after = resume.slice(endIndex).trimStart();
  const nextContent = `${before}\n\n${projectsSection}\n\n${after}\n`;

  fs.writeFileSync(resumeMdPath, nextContent, "utf8");
  return topProjects;
}

function regeneratePdf() {
  try {
    execSync(`pandoc "${resumeMdPath}" -o "${resumePdfPath}"`, { stdio: "ignore" });
    return true;
  } catch (_error) {
    return false;
  }
}

function main() {
  const topProjects = syncResumeMarkdown();
  const pdfOk = regeneratePdf();

  console.log("Synced resume PROJECTS section from portfolio data.");
  console.log("Top projects selected:");
  topProjects.forEach((project, idx) => {
    console.log(`${idx + 1}. ${project.title}`);
  });

  if (pdfOk) {
    console.log("Regenerated public/Arie_Resume_general.pdf");
  } else {
    console.log("Skipped PDF generation (pandoc not available).");
  }
}

main();
