// ── Personal Info ──
export const personalInfo = {
  name: "Arie DeKraker",
  title: "Intermediate Data Analyst",
  phone: "(734) 945-3869",
  email: "ariedekraker@gmail.com",
  linkedin: "https://www.linkedin.com/in/arie-dekraker/",
  github: "https://github.com/HaveACigar",
  hackerrank: "https://www.hackerrank.com/ariedekraker",
  website: "https://www.arieswebsite.com",
  tagline:
    "Data professional with a Master's specialization in Data Science and deep experience in designing, developing, and deploying high-impact, end-to-end data solutions and scalable backend systems.",
};

// ── Skills ──
export const skills = [
  {
    category: "Programming",
    items: [
      "Python",
      "FastAPI",
      "NumPy",
      "Pandas",
      "GeoPandas",
      "Plotly",
      "SQLAlchemy",
      "Pytest",
      "R",
      "JavaScript",
      "TypeScript",
      "Java",
      "Kotlin",
      "SQL",
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Deep Learning",
      "NLP",
      "Generative AI",
      "Embeddings",
      "LLM Evaluation",
      "Feature Engineering",
      "A/B Testing",
      "DOE",
    ],
  },
  {
    category: "LLM & Quantitative",
    items: [
      "OpenAI API",
      "LangChain",
      "LangGraph",
      "VectorDBs",
      "pgvector",
      "RAG Architectures",
      "Prompt Engineering",
      "Semantic Search",
      "Observability & Tracing",
      "Causal Inference",
    ],
  },
  {
    category: "MLOps & Cloud",
    items: [
      "GCP",
      "AWS",
      "Azure",
      "Cloud Run",
      "BigQuery",
      "Kafka",
      "Databricks",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "CI/CD",
      "Monitoring & Telemetry",
      "Jira",
      "Confluence",
    ],
  },
  {
    category: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Hive",
      "Spark",
      "MariaDB",
      "MySQL",
    ],
  },
  {
    category: "Data Visualization",
    items: [
      "Power BI",
      "Tableau",
      "Matplotlib",
      "ggplot2",
      "Actionable Visualizations",
    ],
  },
];

// ── Work Experience ──
export const experience = [
  {
    id: 1,
    role: "Data Analyst",
    team: "DnA Team, Subscriptions Platform",
    company: "Ford Motor Company",
    employmentType: "Permanent Full-time",
    location: "Dearborn, Michigan · Hybrid",
    period: "May 2024 – Present",
    category: "data-science",
    summary:
      "As a member of Ford Motor Company's DnA team within the Subscriptions Platform, I specialize in designing, developing, and deploying high-impact Machine Learning and Deep Learning solutions. My focus is on leveraging MLOps practices to build and manage scalable data pipelines that deliver predictive and prescriptive analytics, enhancing and optimizing Ford's vehicle subscription services.",
    highlights: [
      "Led the design and scalable deployment of predictive Deep Learning models for subscription churn forecasting, utilizing MLOps workflows for high-uptime inference and delivering prescriptive analytics to executive partners.",
      "Designed and implemented a comprehensive, tiered data quality framework in Dataform, standardizing data ingestion and cleaning for complex machine learning model training and robust data consumption across scalable systems.",
      "Managed and optimized critical ML workflows for key business areas (Promotions, Rewards, Payments, Charging, and Core Metrics), leveraging MLOps principles to ensure high uptime and scalable performance.",
      "Led the implementation of A/B testing and Design of Experiments (DOE) methodologies for key product features, providing strategic, data-driven, and actionable recommendations to senior business partners.",
      "Led a critical cloud migration to Google Cloud (GCP), deploying secure, automated pipelines that moved curated data into BigQuery to power unified, scalable reporting across all Subscriptions KPIs.",
      "Fostered a culture of self-service analytics by training and mentoring cross-functional teams on Power BI and Dataform best practices for successful tool adoption.",
      "Partnered with engineering and product teams to translate complex business challenges into comprehensive, end-to-end data science solutions.",
    ],
    tech: [
      "Python", "BigQuery", "Dataform", "GCP", "Power BI",
      "MLOps", "Deep Learning", "A/B Testing", "DOE",
    ],
  },
  {
    id: 2,
    role: "Software Engineer",
    team: "Loyalty Team, Rewards Platform",
    company: "Ford Motor Company",
    employmentType: "Full-time",
    location: "United States · Hybrid",
    period: "March 2021 – August 2023",
    category: "software-engineering",
    summary:
      "A continuation of my previous role with expanded responsibilities and exposure to new technologies. Focused on building and scaling high-availability backend services for the Rewards Platform, while implementing DevOps and Site Reliability Engineering (SRE) practices for maximum performance and stability.",
    highlights: [
      "Engineered highly-available RESTful APIs for FordPass & LincolnWay applications, scaling to handle 20M+ monthly requests with 99.999% uptime.",
      "Integrated Apache Kafka for real-time streaming data services, enabling high-volume responsive applications.",
      "Built robust CI/CD pipelines in Jenkins to accelerate feature deployment and ensure high quality production code, reinforcing DevOps standards.",
      "Enhanced Site Reliability Engineering (SRE) visibility by using Grafana to chart critical service metrics and assisting the team with the initial set up of VictorOps for alert management.",
      "Mentored and accelerated team onboarding by pairing with several new members when they first joined the team, ensuring quick knowledge transfer and code quality.",
    ],
    tech: [
      "Java", "Kotlin", "Spring Boot", "Kafka", "Jenkins",
      "Grafana", "REST APIs", "CI/CD", "DevOps", "SRE",
    ],
  },
  {
    id: 3,
    role: "Software Engineer",
    team: "Loyalty Team, Rewards Platform",
    company: "Ford Motor Company (via Brooksource)",
    employmentType: "Full-time (Contract)",
    location: "Allen Park, MI",
    period: "September 2019 – March 2021",
    category: "software-engineering",
    summary:
      "Backend Software Developer and key member of Ford's Loyalty team, supporting the FordPass and Lincoln Way mobile applications with high-availability Java-based services. Operated in an Agile environment using the Extreme Programming (XP) framework, focusing on robust engineering, operational excellence, and team collaboration.",
    highlights: [
      "Engineered RESTful APIs for FordPass & LincolnWay, handling 20M+ monthly requests with 99.999% uptime.",
      "Integrated Apache Kafka for real-time streaming data services, enabling high-volume responsive applications.",
      "Built robust CI/CD pipelines in Jenkins to accelerate feature deployment and ensure high quality production code.",
      "Core backend development using the Spring framework and Spring Boot for all API creation, assisting in the creation and maintenance of several critical APIs and listeners owned by Ford Loyalty.",
      "Maintained operational excellence by using Splunk and Dynatrace for log analysis and Grafana/Dynatrace to monitor and analyze code metrics.",
      "Ensured code quality and stability by following Test-Driven Development (TDD) guidelines daily and working in pairs during all development.",
      "Drove team development and knowledge sharing by leading several team meetings and conducting learning sessions over both Git and Python.",
      "Worked as a member of the Production support pair, demonstrating cross-functional operational ownership.",
    ],
    tech: [
      "Java", "Spring Boot", "Kafka", "Jenkins", "Splunk",
      "Dynatrace", "Grafana", "TDD", "XP", "REST APIs",
    ],
  },
];

// ── Education ──
export const education = [
  {
    id: 1,
    degree: "Master of Data Science and Analytics",
    specialization: "Data Science",
    gpa: "3.9",
    school: "University of Calgary",
    location: "Canada",
    period: "September 2023 – December 2024",
    logo: "assets/Calgary_Logo.png",
    coursework: [
      "Machine Learning",
      "Big Data Applications",
      "Statistical Modeling",
      "Actionable Visualizations",
    ],
  },
  {
    id: 2,
    degree: "Bachelor of Science, Computer Science",
    school: "Eastern Michigan University",
    location: "USA",
    period: "September 2015 – April 2019",
    logo: "assets/EMU.png",
    coursework: [],
  },
];

// ── Projects ──
export const projects = [
  {
    id: 2,
    slug: "economic-gender-divide-analysis",
    title: "Economic & Gender Divide Analysis",
    description:
      "Multi-dimensional analysis of wage disparities across Canadian provinces and industries, examining the intersection of economic inequality and gender divides using statistical modeling and visualization. Research was accepted and presented at YYC DataCon 2024.",
    tech: ["Python", "Pandas", "Visualization", "Statistics"],
    status: "Complete",
    category: "data-science",
    link: "https://carnelian-partridge-c1a.notion.site/Economic-and-Gender-Divides-A-Comprehensive-Analysis-of-Wage-Disparities-Across-Canadian-Regions-e3d0e935111a41b295136ac77fe0964c",
    resources: [
      {
        title: "Notion Analysis",
        type: "Website",
        url: "https://carnelian-partridge-c1a.notion.site/Economic-and-Gender-Divides-A-Comprehensive-Analysis-of-Wage-Disparities-Across-Canadian-Regions-e3d0e935111a41b295136ac77fe0964c",
      },
    ],
  },
  {
    id: 3,
    slug: "tmdb-movie-analysis",
    title: "TMDb Movie Analysis",
    description:
      "End-to-end ML pipeline on The Movie Database (TMDb) applying feature engineering, regression, and classification models to predict box office revenue and audience reception from pre-release film metadata.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    status: "Complete",
    category: "data-science",
    link: "/In-Depth Analysis of The Movie Database (TMDb).pdf",
    resources: [
      {
        title: "Project Report (PDF)",
        type: "PDF",
        url: "/In-Depth Analysis of The Movie Database (TMDb).pdf",
      },
      {
        title: "Workbook (Jupyter Notebook)",
        type: "Notebook",
        url: "/In-Depth Analysis of The Movie Database (TMDb).ipynb",
      },
    ],
  },
  {
    id: 4,
    slug: "calgary-mobility-app",
    title: "Calgary Mobility App",
    description:
      "Interactive geospatial dashboard analyzing Calgary transit trip durations and distances across city zones using real trip data. Built with Python Dash, Plotly, and GeoPandas; deployed live on Render.",
    tech: ["Python", "Dash", "Plotly", "GeoPandas"],
    status: "Complete",
    category: "data-science",
    link: "https://mobility-app-yyc.onrender.com/duration-distance",
    resources: [
      {
        title: "Live Mobility Dashboard",
        type: "Website",
        url: "https://mobility-app-yyc.onrender.com/duration-distance",
      },
    ],
  },
  {
    id: 5,
    slug: "calgary-climate-model-report",
    title: "Calgary Climate Model Report",
    description:
      "Statistical climate modeling of Calgary weather patterns using R, applying time-series analysis, regression, and ggplot2 visualizations to identify long-term temperature and precipitation trends.",
    tech: ["R", "Statistical Modeling", "ggplot2"],
    status: "Complete",
    category: "data-science",
    link: "/Calgary Climate Model Report_603.pdf",
    resources: [
      {
        title: "Climate Model Report (PDF)",
        type: "PDF",
        url: "/Calgary Climate Model Report_603.pdf",
      },
    ],
  },
  {
    id: 6,
    slug: "residential-building-costs-analysis",
    title: "Residential Building Costs Analysis",
    description:
      "Regression-based analysis correlating residential building costs with macroeconomic indicators, identifying key cost drivers through feature selection and multivariate modeling across Canadian housing market datasets.",
    tech: ["Python", "Regression", "Pandas"],
    status: "Complete",
    category: "data-science",
    link: "/DATA 602 - Final Report.pdf",
    resources: [
      {
        title: "Final Report (PDF)",
        type: "PDF",
        url: "/DATA 602 - Final Report.pdf",
      },
    ],
  },
];

// ── Legacy exports (backward compat) ──
export const reactPortfolio = [
  { id: 1, title: "This website", img: "assets/portfolio.png" },
];
export const angularPortfolio = [
  { id: 1, title: "TBD", img: "assets/portfolio.png" },
];

// ── Personal Projects (Data Science Portfolio) ──
// These are independent, self-directed projects designed to showcase
// specific Data Science skillsets beyond academic and professional work.
export const personalProjects = [
  {
    id: "react-portfolio-website",
    title: "React Portfolio Website",
    subtitle: "Full-Stack SPA — React, MUI, GCP App Engine & CI/CD",
    description:
      "A professional portfolio website built as a single-page application with React 18 and " +
      "React Router v6 for client-side routing. The UI is composed with Material UI (MUI) components " +
      "and custom SCSS. Features include dark/light mode via React Context, specialty pages that " +
      "filter experience and projects by category, and a contact form powered by EmailJS that emails " +
      "the site owner directly. Deployed on GCP App Engine with a GitHub Actions CI/CD pipeline " +
      "that auto-builds and deploys on every push to main.",
    tech: [
      "React 18", "React Router v6", "MUI", "Emotion", "SCSS",
      "EmailJS", "GCP App Engine", "GitHub Actions",
    ],
    skillsShowcased: [
      "Frontend Architecture",
      "Component-Driven UI",
      "CI/CD Pipelines",
      "Cloud Deployment",
    ],
    status: "Ongoing",
    category: "both",
    github: "https://github.com/HaveACigar/arie_react_portfolio_website",
    link: "https://www.arieswebsite.com",
    route: "/personal-projects/react-portfolio-website",
    // Page makeup — update this list when noteworthy structural changes are made
    pageMakeup: [
      "/ — Landing page: Intro (typed tagline via ityped), About Me, Skills grid, Experience timeline, School Projects grid, Personal Projects grid, Education cards",
      "/data-science — Filtered view: DS skills, data-science experience, education, data-science projects",
      "/software-engineering — Filtered view: SWE skills, software-engineering experience, education, SWE projects, key highlights",
      "/personal-projects — Listing of all self-directed Data Science portfolio projects",
      "/personal-projects/eda-visualization-dashboard — Deep-dive: EDA project with tech stack, highlights, data quality issues, dashboard sections, architecture",
      "/personal-projects/react-portfolio-website — This page: technical breakdown of the portfolio site itself",
      "/portfolio — Tabbed view: React works, Angular works, Masters/Java/Web/Undergrad works",
      "/mastersprojects — University of Calgary project showcase (Notion, PDFs, Jupyter)",
      "/contact — EmailJS-powered contact form that emails the site owner directly",
      "/contactme — Alternative contact page",
      "/aboutme — Dedicated about page",
    ],
    highlights: [
      "11 routes served via React Router v6 in a single-page application",
      "Dark/light mode toggle powered by React Context + useReducer",
      "Specialty pages dynamically filter skills, experience, and projects by category",
      "GitHub Actions workflow auto-deploys to GCP App Engine on every push to main",
      "EmailJS integration for contact form — sends email directly to the site owner",
      "Responsive grid layouts via MUI sx props with xs/sm/md breakpoints",
      "Centralized data architecture — all content driven from a single data.js file",
    
      "Extension for Zillow Data Scientist II: Extend React Portfolio Website with a role-specific workflow focused on python, sql; Add explicit evaluation checks and reporting outputs tied to target stakeholder decisions",],
  },
  {
    id: "fitness-log-app",
    title: "Fitness Log App",
    subtitle: "Full-Stack Fitness Tracker — Next.js, Firebase Auth/Firestore/Storage",
    description:
      "A multi-page fitness tracking application with authentication, daily metrics logging, workouts, sleep tracking, nutrition planning, photo uploads, and 30-day trend prediction. " +
      "Built with Next.js and Firebase, then integrated into this portfolio through a dedicated /fitness-log route.",
    tech: [
      "Next.js", "React", "TypeScript", "Firebase Auth", "Firestore",
      "Firebase Storage", "Recharts", "CSS Modules",
    ],
    skillsShowcased: [
      "Full-Stack Product Development",
      "Realtime Data Modeling",
      "Authentication & Cloud Storage",
      "Analytics UX",
    ],
    status: "Ongoing",
    category: "software-engineering",
    github: "https://github.com/HaveACigar/arieai-chat-log",
    route: "/fitness-log",
    highlights: [
      "Daily metrics logs with edit/delete controls",
      "Workout, sleep, and nutrition pages with trend charts",
      "Image uploads for meals and profile pictures",
      "30-day progress projection locked until enough history is logged",
      "Portfolio-route integration via /fitness-log",
    ],
  },
  {
    id: "arieai-assistant",
    title: "ArieAI Portfolio Assistant",
    subtitle: "Authenticated Chat Assistant - React, FastAPI, Firebase, OpenAI",
    description:
      "A production portfolio assistant that answers questions about my projects and experience with authenticated chat history, session management, and API fallback reliability. Includes guest mode, signed-in persistence, and grounded responses from portfolio knowledge.",
    tech: [
      "React",
      "MUI",
      "FastAPI",
      "Firebase Auth",
      "Firestore",
      "OpenAI",
      "Cloud Run",
      "App Engine",
    ],
    skillsShowcased: [
      "Full-Stack AI Product",
      "Auth + Session Persistence",
      "Cloud Deployment",
      "Reliable API Integrations",
    ],
    status: "Ongoing",
    category: "software-engineering",
    github: "https://github.com/HaveACigar/site-knowledge-chat-api",
    link: "https://www.arieswebsite.com/assistant",
    route: "/assistant",
    highlights: [
      "Signed-in chat sessions saved and loaded per user",
      "Guest mode with non-persistent chat behavior",
      "Cloud Run chat API with fallback endpoints and improved error handling",
      "Session sidebar with create/select history flows",
      "Portfolio-grounded prompt and guardrail behavior",
    ],
  },
  {
    id: "rag-ops-platform",
    title: "LLM RAG Ops Platform",
    subtitle: "Production RAG System - FastAPI, Streaming, Evals, pgvector, OpenAI",
    description:
      "A production-style retrieval-augmented generation platform built around FastAPI, optional pgvector retrieval, OpenAI-backed generation, streaming responses, routed multi-source ingestion, and built-in evaluation and observability. The system ingests difficult real-world datasets, applies source-aware retrieval and guardrails, and exposes both API and demo UI surfaces for live operational exploration.",
    tech: [
      "Python", "FastAPI", "OpenAI", "pgvector", "Scikit-learn",
      "Docker", "LangSmith", "SSE Streaming", "Evaluation Harness", "Guardrails",
    ],
    skillsShowcased: [
      "LLM System Design",
      "RAG Architecture",
      "Streaming APIs",
      "Evaluation and Monitoring",
      "Production API Engineering",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/arie_react_portfolio_website",
    route: "/personal-projects/rag-ops-platform",
    highlights: [
      "Source-aware routing shows leadership exactly which data domain drove each answer, making governance and audit conversations concrete instead of theoretical.",
      "Evaluation scorecards expose where grounded-answer quality drops by source, so roadmap investment can be prioritized by business risk rather than anecdotal feedback.",
      "Streaming responses and guardrailed generation improve perceived reliability in live demos, which is critical for stakeholder trust in production AI workflows.",
    ],
  },
  {
    id: "eda-visualization-dashboard",
    title: "EDA & Visualization Dashboard",
    subtitle: "Data Cleaning, Statistical Analysis & Interactive Visualization",
    description:
      "End-to-end exploratory data analysis on merged real-world World Bank health and economic indicators " +
      "containing substantial data quality and integration challenges. Demonstrates a full wrangling pipeline " +
      "(aggregate-entity filtering, sparse coverage, mixed null markers, naming inconsistencies, type coercion) " +
      "followed by statistical analysis and an interactive Streamlit dashboard with 9 sections.",
    tech: [
      "Python", "Pandas", "NumPy", "Plotly", "Streamlit",
      "Scikit-learn", "Regex", "Statistics",
    ],
    skillsShowcased: [
      "Data Cleaning & Wrangling",
      "Statistical Analysis",
      "Interactive Visualization",
      "Modular Python Architecture",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/eda-visualization-dashboard",
    liveDemo: "https://eda-visualization-dashboard-v7z4vnunqa-uc.a.run.app",
    // Route within the portfolio website for the detailed project page
    route: "/personal-projects/eda-visualization-dashboard",
    highlights: [
      "Cross-country benchmarking shows outcome gaps are concentrated in a small set of income-tier and infrastructure combinations, helping stakeholders target interventions instead of spreading budgets evenly.",
      "Trend decomposition reveals multiple regions with GDP growth but weaker health-outcome movement, signaling execution and policy-delivery gaps rather than pure funding gaps.",
      "Data-quality normalization materially changes country rankings, demonstrating why governance controls should be treated as a board-level risk and not just a technical cleanup task.",
    ],
  },
  {
    id: "snowflake-finance-ai-command-center",
    title: "Snowflake Finance AI Command Center",
    subtitle: "Finance KPI Marts, Renewal Risk Scoring & AI-Ready Executive Narratives",
    description:
      "Snowflake-style finance analytics project tailored to finance analytics and AI roles. " +
      "The first version models subscription billing, collections, expansion/contraction, and renewal pressure into layered SQL marts, " +
      "then surfaces ARR, NRR, DSO, open A/R, account-level risk scoring, and AI-ready executive summaries in an interactive app.",
    tech: [
      "SQL", "Snowflake SQL", "Python", "SQLite", "Pandas", "Streamlit",
      "Plotly", "Window Functions", "Streams & Tasks", "Finance KPIs",
    ],
    skillsShowcased: [
      "Finance Analytics",
      "Analytics Engineering",
      "Executive KPI Modeling",
      "AI Workflow Design",
    ],
    recruiterSignals: [
      "Demonstrates direct ownership of finance-facing KPI definitions such as ARR, NRR, DSO, and collections exposure.",
      "Shows warehouse-style thinking with explicit silver and mart layers that can be ported cleanly to Snowflake schemas.",
      "Includes AI-ready outputs built from curated marts rather than raw tables, which is the right pattern for trustworthy finance copilots.",
    ],
    deliverables: [
      "Add scenario planning inputs so finance can compare base, upside, and downside forecast tracks.",
      "Persist copilot conversation logs and answer quality metrics for governance and tuning.",
      "Deploy the app as a public recruiter demo with role-based views for finance leadership vs analysts.",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/arie_react_portfolio_website/tree/main/projects/snowflake_finance_ai_command_center",
    liveDemo: "https://snowflake-finance-ai-command-center-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/snowflake-finance-ai-command-center",
    architectureFlow: [
      {
        stage: "Bronze",
        layer: "Raw Inputs",
        detail: "Billing events and forecast plan land as source-aligned tables.",
      },
      {
        stage: "Silver",
        layer: "Account Monthly",
        detail: "Windowed transformations standardize MRR movement, open A/R, and renewal windows.",
      },
      {
        stage: "Gold",
        layer: "Finance Marts",
        detail: "KPI mart, variance bridge, and account risk mart power leadership reporting.",
      },
      {
        stage: "AI",
        layer: "Finance Copilot",
        detail: "Copilot responses are grounded only on curated mart outputs for reliable narratives.",
      },
    ],
    highlights: [
      "ARR growth analysis shows expansion is concentrated in a narrower account cohort than topline numbers imply, surfacing concentration risk that leadership can proactively hedge.",
      "DSO and open-A/R trend views pinpoint where collections friction is absorbing working capital, giving finance a direct operating lever beyond revenue growth.",
      "Renewal-risk scoring isolates accounts where support pressure and payment latency overlap, enabling earlier interventions before risk converts into churn.",
    ],
  },
  {
    id: "agentic-claims-communication-copilot",
    title: "Agentic Claims Communication Copilot",
    subtitle: "Applied AI Workflow Platform for Triage, Drafting, and Decision Support",
    description:
      "Applied AI project narrative focused on customer communication workflows in an insurance-style environment. " +
      "It demonstrates agentic orchestration patterns for intent triage, context retrieval, response drafting, " +
      "decision support, and human handoff while emphasizing production-minded quality checks, reporting, and reliability.",
    tech: [
      "Python", "SQL", "Streamlit", "Pandas", "Plotly",
      "LLM API Patterns", "Workflow Orchestration", "Evaluation Harness", "GitHub", "PR Workflows",
    ],
    skillsShowcased: [
      "Applied AI Engineering",
      "Agentic Workflow Design",
      "Production Reliability Patterns",
      "Reporting Automation",
    ],
    recruiterSignals: [
      "Shows practical workflow engineering beyond single-prompt demos by separating retrieval, reasoning, tool calls, and escalation paths.",
      "Demonstrates Python and SQL fluency in the same solution through orchestration services, evaluation datasets, and operational reporting layers.",
      "Frames AI work with measurable quality signals (completion rate, escalation precision, and workflow failure categories) instead of generic model output screenshots.",
    ],
    deliverables: [
      "Expand evaluation coverage with scenario packs for policy updates, claims status, and document-driven requests.",
      "Add configurable policy rules and confidence thresholds to improve deterministic routing behavior.",
      "Publish a reusable operations report template for weekly quality reviews and stakeholder readouts.",
    ],
    status: "In Progress",
    category: "data-science",
    github: "https://github.com/HaveACigar/arie_react_portfolio_website",
    route: "/personal-projects/agentic-claims-communication-copilot",
    architectureFlow: [
      {
        stage: "Intake",
        layer: "Request Triage",
        detail: "Incoming chat/email/voice transcripts are classified by intent, urgency, and required workflow path.",
      },
      {
        stage: "Context",
        layer: "Retrieval + Rules",
        detail: "Grounding context and policy-style rules are pulled before generation to constrain output quality.",
      },
      {
        stage: "Action",
        layer: "Agentic Orchestration",
        detail: "Workflow engine coordinates drafting, decision support prompts, and tool-style steps with explicit checks.",
      },
      {
        stage: "Governance",
        layer: "Evaluation + Reporting",
        detail: "Outcome logs power quality scorecards, failure taxonomy reporting, and iterative workflow tuning.",
      },
    ],
    highlights: [
      "Intent-mix analysis shows a limited set of request types drives most escalations, giving operations a focused path to automate the highest-friction work first.",
      "Quality scorecards expose where unsupported assertions cluster by scenario, enabling governance teams to harden prompts and rules where customer risk is highest.",
      "Escalation timing analysis demonstrates that early handoff on high-risk cases reduces downstream rework and improves end-to-end handling consistency.",
    ],
  },
  // Future personal projects will be added here as they are completed:
  // { id: "supervised-ml-pipeline", title: "Supervised ML: Prediction Pipeline", ... },  // DONE ↓
  {
    id: "supervised-ml-pipeline",
    title: "Supervised ML: Churn Prediction Pipeline",
    subtitle: "End-to-End Classification — sklearn Pipelines, XGBoost & SHAP Explainability",
    description:
      "End-to-end supervised ML project on the IBM Telco Customer Churn dataset (7,043 customers, " +
      "20 features). Demonstrates a full production-quality workflow: sklearn ColumnTransformer " +
      "preprocessing pipelines, 5-fold stratified cross-validation across 4 models, " +
      "SHAP TreeExplainer for feature explainability, and a live interactive Streamlit dashboard " +
      "with ROC curves, confusion matrices, and a real-time churn probability predictor.",
    tech: [
      "Python", "Scikit-learn", "XGBoost", "SHAP", "Pandas",
      "Plotly", "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "Supervised ML (Classification)",
      "Feature Engineering & Pipelines",
      "Model Evaluation & Explainability",
      "MLOps & Cloud Deployment",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/supervised-ml-pipeline",
    liveDemo: "https://supervised-ml-pipeline-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/supervised-ml-pipeline",
    highlights: [
      "Risk segmentation shows churn is concentrated in low-tenure customers with repeated support interaction, giving retention teams a concrete intervention cohort.",
      "Explainability outputs show engagement and service-friction signals dominate demographics, helping leadership prioritize product and service actions over broad discounting.",
      "Threshold analysis in the app clarifies the precision-recall tradeoff, enabling executives to set intervention policy based on budget and capacity constraints.",
    ],
  },
  {
    id: "nlp-text-analytics",
    title: "NLP & Text Analytics",
    subtitle: "Sentiment Classification, Topic Modeling & Semantic Similarity Search",
    description:
      "End-to-end NLP pipeline on 8,530 Rotten Tomatoes critic reviews. " +
      "A full text-processing workflow (HTML stripping, stopword removal, tokenization) " +
      "feeds a TF-IDF + Logistic Regression sentiment classifier, dual topic models (NMF + LDA), " +
      "and sentence-embedding semantic search using all-MiniLM-L6-v2 — all served in a " +
      "5-tab interactive Streamlit dashboard deployed on Cloud Run.",
    tech: [
      "Python", "Pandas", "NLTK", "Scikit-learn", "Sentence Transformers",
      "Plotly", "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "NLP Pipelines",
      "Text Classification",
      "Semantic Search / Embeddings",
      "Topic Modeling",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/nlp-text-analytics",
    liveDemo: "https://nlp-text-analytics-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/nlp-text-analytics",
    highlights: [
      "Topic modeling separates criticism themes into distinct operational buckets (for example, writing quality vs execution quality), enabling clearer ownership for action planning.",
      "Sentiment and confidence views expose where public perception is most polarized, helping stakeholders distinguish niche backlash from broad-market risk.",
      "Semantic search surfaces recurring complaint patterns that keyword dashboards miss, improving how leadership prioritizes product and content improvements.",
    ],
  },
  {
    id: "deep-learning-image-classifier",
    title: "Deep Learning Image Classifier",
    subtitle: "Transfer Learning with MobileNetV3 on CIFAR-10",
    description:
      "End-to-end computer vision pipeline using transfer learning on CIFAR-10. " +
      "A pretrained MobileNetV3-small backbone is fine-tuned for 10-class classification, " +
      "evaluated with training/validation curves and confusion matrix diagnostics, and deployed " +
      "as an interactive Streamlit app on Cloud Run with upload-based inference.",
    tech: [
      "Python", "PyTorch", "Torchvision", "NumPy", "Scikit-learn",
      "Plotly", "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "Deep Learning",
      "Computer Vision",
      "Transfer Learning",
      "Model Evaluation",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/deep-learning-image-classifier",
    liveDemo: "https://deep-learning-image-classifier-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/deep-learning-image-classifier",
    highlights: [
      "Confusion-matrix diagnostics reveal which visually similar classes create most misclassification cost, guiding targeted data-collection strategy.",
      "Top-5 probability spread highlights low-confidence predictions suitable for human review, improving trust and risk control in operational use.",
      "Learning-curve behavior demonstrates where transfer learning quickly captures baseline value and where additional data/augmentation is needed for material gains.",
    ],
  },
  {
    id: "time-series-forecasting",
    title: "Time Series Forecasting",
    subtitle: "Walk-Forward Backtesting with Naive, Holt-Winters, and XGBoost",
    description:
      "End-to-end monthly forecasting pipeline on atmospheric CO2 series using three model families: " +
      "Seasonal Naive baseline, Holt-Winters Exponential Smoothing, and XGBoost with lag/calendar features. " +
      "Includes walk-forward backtesting, RMSE/MAE/sMAPE model comparison, and a 24-month interactive forecast dashboard deployed on Cloud Run.",
    tech: [
      "Python", "Pandas", "Statsmodels", "Scikit-learn", "XGBoost",
      "Plotly", "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "Time Series Forecasting",
      "Backtesting",
      "Feature Engineering",
      "Model Benchmarking",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/time-series-forecasting",
    liveDemo: "https://time-series-forecasting-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/time-series-forecasting",
    highlights: [
      "Backtesting shows where simple seasonal baselines remain competitive, helping leadership avoid unnecessary model complexity when business conditions are stable.",
      "Error spikes align with regime-shift windows, signaling when retraining or scenario overrides are operationally necessary.",
      "Side-by-side forecast trajectories quantify planning sensitivity by model class, improving confidence intervals for capacity and budget planning.",
    ],
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    subtitle: "Popularity Ranking, Content Similarity, and Collaborative Filtering",
    description:
      "MovieLens recommendation platform comparing three recommendation strategies: Bayesian popularity ranking, " +
      "content-based similarity from movie metadata, and collaborative filtering via matrix factorization. " +
      "The deployed Streamlit app lets reviewers inspect top titles, find similar movies, and generate personalized recommendations for real users.",
    tech: [
      "Python", "Pandas", "Scikit-learn", "SciPy", "Plotly",
      "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "Recommendation Systems",
      "Ranking Metrics",
      "Similarity Search",
      "Matrix Factorization",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/recommendation-system",
    liveDemo: "https://recommendation-system-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/recommendation-system",
    highlights: [
      "Bayesian ranking prevents sparse-rating titles from distorting leaderboard decisions, creating a more defensible top-content strategy.",
      "Collaborative recommendations improve personalization depth but expose cold-start catalog risk, clarifying where editorial fallback logic is required.",
      "Content-similarity flows increase long-tail discoverability, supporting revenue diversification beyond blockbuster concentration.",
    ],
  },
  {
    id: "ab-testing-statistical-inference",
    title: "A/B Testing & Statistical Inference",
    subtitle: "Experiment Design, Hypothesis Testing & Causal Decision Support",
    description:
      "End-to-end experiment analysis workflow on real marketing campaign response data with treatment/control cohorts, " +
      "conversion lift estimation, significance testing, confidence intervals, power curves, and segment-level heterogeneity analysis. " +
      "The Streamlit app presents statistical findings in a business-facing format suitable for product decisions.",
    tech: [
      "Python", "Pandas", "SciPy", "Statsmodels", "NumPy",
      "Plotly", "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "Experimental Design",
      "Statistical Inference",
      "Power Analysis",
      "Decision Framing",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/ab-testing-statistical-inference",
    liveDemo: "https://ab-testing-statistical-inference-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/ab-testing-statistical-inference",
    highlights: [
      "Lift dashboards separate statistical significance from business significance, preventing rollouts that are mathematically significant but financially weak.",
      "Power curves show how under-sized tests can create false confidence, giving product and finance teams a clear readiness gate before launch decisions.",
      "Segment-level treatment effects reveal where impact is concentrated, enabling targeted rollout strategy instead of one-size-fits-all deployment.",
    ],
  },
  {
    id: "sql-data-engineering-pipeline",
    title: "SQL & Data Engineering Pipeline",
    subtitle: "Data Modeling, Incremental ETL & Analytical Reporting Layers",
    description:
      "Warehouse-style analytics pipeline that ingests raw ecommerce customer and order data (Olist public marketplace dataset), cleans it in staging, " +
      "builds fact and dimension tables, and publishes mart tables for KPI reporting. " +
      "Implemented in DuckDB with SQL transformations and surfaced through a Streamlit operations dashboard.",
    tech: [
      "SQL", "Python", "DuckDB", "Pandas", "PyArrow",
      "Plotly", "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "Data Engineering",
      "Data Modeling",
      "ETL / ELT",
      "Analytics Enablement",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/sql-data-engineering-pipeline",
    liveDemo: "https://sql-data-engineering-pipeline-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/sql-data-engineering-pipeline",
    highlights: [
      "Data-quality remediation materially shifts KPI baselines, demonstrating how governance decisions directly affect executive reporting outcomes.",
      "Mart-level revenue and customer views identify which cohorts drive volatility, improving where leadership focuses pricing and retention levers.",
      "Layered raw-to-mart lineage gives stakeholders traceable KPI provenance, reducing reconciliation friction between analytics and business teams.",
    ],
  },
  {
    id: "ml-model-deployment",
    title: "ML Model Deployment (MLOps)",
    subtitle: "Model Serving, Drift Monitoring & CI/CD for Inference Systems",
    description:
      "Production-style FastAPI inference service serving a binary classifier trained on the UCI Adult Income dataset, with health checks, schema validation, batch scoring, and lightweight feature-drift reporting. " +
      "The model is trained at build time, versioned as an artifact, and exposed through Cloud Run with documented REST endpoints.",
    tech: [
      "Python", "FastAPI", "Pandas", "Scikit-learn", "Docker",
      "Cloud Run", "GitHub Actions", "Joblib",
    ],
    skillsShowcased: [
      "MLOps",
      "Model Serving",
      "Monitoring & Drift Detection",
      "Production Engineering",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/ml-model-deployment",
    liveDemo: "https://ml-model-deployment-v7z4vnunqa-uc.a.run.app/docs",
    apiBaseUrl: "https://ml-model-deployment-v7z4vnunqa-uc.a.run.app",
    liveDemoLabel: "Open API Docs",
    hideEmbed: true,
    apiEndpoints: [
      { path: "/docs", description: "interactive OpenAPI docs" },
      { path: "/health", description: "service health check" },
      { path: "/metrics", description: "basic service metrics" },
      { path: "/drift", description: "live payload drift summary" },
    ],
    samplePayload: {
      monthly_spend: 149.0,
      tenure_months: 8,
      support_tickets: 3,
      logins_last_30d: 11,
      discount_ratio: 0.15,
      payment_failures: 1,
    },
    predictEndpoint: "/predict",
    outcomeCards: [
      {
        title: "Inference Service",
        value: "Live on Cloud Run",
        detail: "FastAPI classifier endpoint supports single and batch scoring with schema validation.",
      },
      {
        title: "Model Monitoring",
        value: "Drift Endpoint Enabled",
        detail: "Feature distribution checks are exposed through `/drift` for ongoing data-quality monitoring.",
      },
      {
        title: "Operational Readiness",
        value: "Docs + Health + Metrics",
        detail: "Recruiters can inspect OpenAPI docs and observability endpoints without local setup.",
      },
    ],
    route: "/personal-projects/ml-model-deployment",
    highlights: [
      "Drift-monitoring views provide early warning when live input behavior diverges from training assumptions, enabling action before model quality degrades.",
      "Batch scoring exposes concentrated high-risk segments, helping operations prioritize interventions where impact is highest.",
      "Service health and metrics endpoints make model performance an operational KPI, not just a notebook result, which aligns with enterprise reliability expectations.",
    ],
  },
  {
    id: "big-data-cloud-analytics",
    title: "Big Data & Cloud Analytics",
    subtitle: "Distributed Processing, Cloud Warehousing & Production-Scale KPIs",
    description:
      "Cloud-style event analytics pipeline over real public NYC Taxi trip records written as partitioned Parquet and queried with DuckDB. " +
      "The project demonstrates warehouse-style KPI marts, country/platform/product rollups, event-funnel analysis, and partition-aware analytics patterns suitable for cloud-scale reporting stacks.",
    tech: [
      "Python", "DuckDB", "Pandas", "PyArrow", "SQL",
      "Plotly", "Streamlit", "Docker", "GCP Cloud Run", "GitHub Actions",
    ],
    skillsShowcased: [
      "Big Data Processing",
      "Cloud Analytics",
      "Distributed Compute",
      "KPI Modeling",
    ],
    status: "Complete",
    category: "data-science",
    github: "https://github.com/HaveACigar/big-data-cloud-analytics",
    liveDemo: "https://big-data-cloud-analytics-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/big-data-cloud-analytics",
    highlights: [
      "Geo-temporal demand concentration analysis shows a small set of zones and hours drive disproportionate trip volume, informing capacity and pricing strategy.",
      "Trip-value and distance mix trends reveal where operational load is growing faster than unit economics, highlighting margin pressure risks.",
      "Partition-aware marts improve decision latency for daily KPI review, enabling leadership to act on near-real-time shifts rather than retrospective summaries.",
    ],
  },
];