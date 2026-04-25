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
    ],
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
      "Supports two retrieval modes: local TF-IDF by default with optional pgvector + embeddings for production-style semantic search",
      "Streams answers over SSE and returns routing metadata so the UI can show how each question was source-filtered",
      "Ingests messy real-world public data including NYC 311, SEC CompanyFacts, and Chicago crime data",
      "Auto-routes user questions to the most relevant source set before retrieval, reducing noise and improving answer grounding",
      "Includes heuristic evals, an LLM-as-judge endpoint, and optional LangSmith-compatible tracing for observability",
      "Ships with backend tests, a demo frontend, Docker/Make targets, and source-specific ingestion scripts",
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
    // Route within the portfolio website for the detailed project page
    route: "/personal-projects/eda-visualization-dashboard",
    highlights: [
      "Cleaned real merged indicator data by removing aggregate entities and normalizing country-year records",
      "Built 8 reusable Plotly chart types (heatmaps, scatter + OLS, box plots, ranked bars, etc.)",
      "Streamlit dashboard with 9 interactive sections covering full EDA workflow",
      "World Bank-style income group classification with group comparison analysis",
      "215 countries across 1960–2025 with 10 health & economic indicators",
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
      "Generates subscription finance events across accounts, regions, segments, renewals, and collections behavior",
      "Builds silver and gold SQL layers for ARR, NRR, gross retention, logo churn, open A/R, and DSO",
      "Includes Snowflake-ready DDL plus stream/task orchestration scripts for warehouse-native operations",
      "Adds a forecast-vs-actual variance bridge mart for ARR, cash, A/R, and NRR decomposition",
      "Scores account-level renewal risk using adoption, collections latency, support load, and near-term renewal windows",
      "Provides a finance copilot tab that answers KPI questions using curated mart outputs only",
      "Structured intentionally as a Snowflake-style finance analytics starter project for recruiter review",
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
    route: "/personal-projects/supervised-ml-pipeline",
    highlights: [
      "4 models compared via 5-fold stratified CV: Logistic Regression, Random Forest, Gradient Boosting, XGBoost",
      "Full sklearn Pipeline with ColumnTransformer — zero data leakage guaranteed during cross-validation",
      "SHAP TreeExplainer on XGBoost: mean |SHAP| bar chart + beeswarm summary plot",
      "Models pre-trained at Docker build time and serialized to disk — instant startup in Cloud Run",
      "Interactive churn predictor with per-prediction SHAP feature contribution breakdown",
      "Class imbalance handled via class_weight='balanced' and XGBoost scale_pos_weight",
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
    route: "/personal-projects/nlp-text-analytics",
    highlights: [
      "7-step text cleaning pipeline: lowercase, HTML removal, URL stripping, non-alpha filter, stopword removal, short-token pruning",
      "TF-IDF (10K features, bigrams) + Logistic Regression sentiment classifier with 5-fold CV and ROC curve evaluation",
      "Both NMF and LDA topic models (10 topics each) with interactive word charts and representative document retrieval",
      "Sentence-level semantic search using all-MiniLM-L6-v2 embeddings — finds thematically similar reviews beyond keyword overlap",
      "Live sentiment demo: type any text and get a model prediction with confidence score",
      "Models pre-trained at Docker build time; artifacts serialized with joblib for instant Streamlit startup",
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
    route: "/personal-projects/deep-learning-image-classifier",
    highlights: [
      "Transfer learning with pretrained MobileNetV3-small; frozen feature extractor and retrained classifier head",
      "Trained on 12,000-image subset with separate validation split for fast iterative experimentation",
      "Interactive diagnostics dashboard with epoch-level train/validation curves and full 10-class confusion matrix",
      "Live upload inference with top-5 predicted classes and probability visualization",
      "Model artifact pre-trained at Docker build time for fast Cloud Run startup",
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
      "12-month walk-forward holdout evaluation (no random split leakage) with side-by-side predictions",
      "Model benchmark table with MAE, RMSE, and sMAPE across Seasonal Naive, Holt-Winters, and XGBoost",
      "Lag feature engineering (1,2,3,6,12 months) plus month/quarter/trend predictors for boosting model",
      "24-month forward forecast with interactive overlay of all three model trajectories",
      "XGBoost feature-importance chart surfacing which lag/calendar features drive predictions",
      "Artifacts pre-trained at Docker build time for fast startup in production",
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
      "MovieLens latest-small dataset powering popularity, content, and collaborative recommendation flows",
      "Bayesian weighted-rating baseline to prevent low-volume titles from dominating top charts",
      "TF-IDF similarity on titles + genres for content-based 'find similar movies' recommendations",
      "NMF matrix factorization over the user-item matrix for personalized top-N ranking",
      "Offline Precision@10 evaluation using a per-user temporal holdout",
      "Interactive app tabs for top movies, similar titles, and user-level recommendations",
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
      "Built on a real direct-marketing campaign dataset with customer-level response outcomes",
      "Two-proportion z-test, confidence interval for lift, and relative/absolute uplift metrics",
      "Power analysis and minimum sample-size calculations for experiment readiness",
      "Segmented lift analysis across device, geography, and lifecycle cohorts",
      "Business-facing charts that separate statistical significance from practical significance",
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
      "Raw, staging, dimension, fact, and mart layers built explicitly in SQL",
      "Resolved real-world data-quality issues such as duplicates, null revenue fields, and invalid quantities in staging",
      "KPI marts for monthly revenue, active customers, order volume, and segment performance",
      "Operational data-quality test results surfaced directly in the dashboard",
      "Warehouse file persisted in DuckDB for fast local analytics and reproducible transformations",
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
    liveDemo: "https://ml-model-deployment-v7z4vnunqa-uc.a.run.app",
    route: "/personal-projects/ml-model-deployment",
    highlights: [
      "FastAPI endpoints for `/predict`, `/batch-predict`, `/health`, `/metrics`, and `/drift`",
      "UCI Adult Income reference dataset and trained logistic regression artifact serialized with joblib",
      "Lightweight drift summary comparing live payload means against reference feature distributions",
      "HTML landing page plus autogenerated OpenAPI docs for recruiter-friendly inspection",
      "Cloud Run deployment pattern that mirrors real inference-service delivery workflows",
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
      "Large-scale NYC Taxi trip records transformed into partitioned Parquet for fast analytical scans",
      "Warehouse-style daily KPI marts for events, users, sessions, purchases, and revenue",
      "Treemap breakdowns for country, platform, and product-category performance",
      "Event funnel analysis plus data-quality checks for partition coverage and revenue integrity",
      "Demonstrates partition-aware analytics patterns similar to cloud warehouse workloads",
    ],
  },
];