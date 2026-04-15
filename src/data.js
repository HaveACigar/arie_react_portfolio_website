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
      "NumPy",
      "Pandas",
      "GeoPandas",
      "Plotly",
      "SQLAlchemy",
      "R",
      "JavaScript",
      "Java",
      "Kotlin",
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
      "A/B Testing",
      "DOE",
    ],
  },
  {
    category: "LLM & Quantitative",
    items: [
      "VectorDBs",
      "RAG Architectures",
      "Prompt Engineering",
      "Causal Inference",
    ],
  },
  {
    category: "MLOps & Cloud",
    items: [
      "GCP",
      "AWS",
      "Azure",
      "BigQuery",
      "Kafka",
      "Databricks",
      "Docker",
      "Kubernetes",
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
    id: "eda-visualization-dashboard",
    title: "EDA & Visualization Dashboard",
    subtitle: "Data Cleaning, Statistical Analysis & Interactive Visualization",
    description:
      "End-to-end exploratory data analysis on a synthetically generated Global Health dataset " +
      "containing 12+ categories of data quality issues. Demonstrates a full wrangling pipeline " +
      "(mixed types, inconsistent naming, impossible values, duplicates, scattered nulls) " +
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
      "Cleaned 12+ categories of data quality issues in a 7-step automated pipeline",
      "Built 8 reusable Plotly chart types (heatmaps, scatter + OLS, box plots, ranked bars, etc.)",
      "Streamlit dashboard with 9 interactive sections covering full EDA workflow",
      "World Bank-style income group classification with group comparison analysis",
      "46 countries across 24 years (2000–2023) with 11 health & economic indicators",
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
    subtitle: "Topic Modeling, Sentiment Analysis & Retrieval-Augmented Search",
    description:
      "An end-to-end NLP portfolio project focused on unstructured customer feedback and product reviews. " +
      "The final build is scoped to include document cleaning, embedding-based semantic search, topic modeling, " +
      "sentiment classification, and an interactive dashboard that lets recruiters inspect themes, complaints, and example documents.",
    tech: [
      "Python", "Pandas", "spaCy", "Sentence Transformers", "BERTopic",
      "scikit-learn", "Plotly", "Streamlit",
    ],
    skillsShowcased: [
      "NLP Pipelines",
      "Text Classification",
      "Semantic Search / Embeddings",
      "Insight Communication",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/nlp-text-analytics",
    highlights: [
      "Customer-review dataset with realistic preprocessing challenges: HTML, emojis, typos, duplicated complaints, and mixed sentiment",
      "Embedding-based nearest-neighbor search for semantic retrieval of similar complaints and product issues",
      "BERTopic or LDA topic modeling to surface recurring problem categories and latent themes",
      "Binary or multi-class sentiment classifier benchmarked with precision, recall, F1, and confusion matrices",
    ],
    recruiterSignals: [
      "Shows ability to work with messy unstructured text instead of only structured CSV data",
      "Demonstrates practical LLM-adjacent skills recruiters now look for: embeddings, retrieval, and explainability",
      "Creates a direct bridge between classic NLP and the modern RAG/GenAI ecosystem",
    ],
    deliverables: [
      "Python training pipeline for text cleaning, vectorization, topic modeling, and sentiment modeling",
      "Interactive Streamlit app with search, topic explorer, and model evaluation tabs",
      "Cloud Run deployment and embedded portfolio page once the app is live",
    ],
  },
  {
    id: "deep-learning-image-classifier",
    title: "Deep Learning Image Classifier",
    subtitle: "Transfer Learning, CNN Fine-Tuning & Explainable Vision Models",
    description:
      "A computer vision project centered on transfer learning and model explainability. " +
      "The planned build uses a well-known benchmark dataset to fine-tune a modern CNN, compare architectures, and surface Grad-CAM visual explanations in a recruiter-friendly demo app.",
    tech: [
      "Python", "PyTorch", "Torchvision", "OpenCV", "NumPy",
      "Plotly", "Streamlit", "Docker",
    ],
    skillsShowcased: [
      "Deep Learning",
      "Computer Vision",
      "Transfer Learning",
      "Model Explainability",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/deep-learning-image-classifier",
    highlights: [
      "Fine-tune pretrained CNN backbones such as ResNet or EfficientNet on a curated labeled image dataset",
      "Benchmark accuracy, precision, recall, top-k accuracy, and calibration across model variants",
      "Use Grad-CAM or saliency maps to show which image regions drove each prediction",
      "Package a lightweight inference demo where users upload an image and inspect confidence scores and visual explanations",
    ],
    recruiterSignals: [
      "Signals hands-on deep learning capability beyond tabular models",
      "Shows you can communicate black-box models using explainability tooling instead of accuracy alone",
      "Adds breadth to your portfolio across vision, not just analytics and regression/classification",
    ],
    deliverables: [
      "Training notebook or script with experiment tracking and validation curves",
      "Inference app with uploaded-image prediction, top classes, and Grad-CAM overlay",
      "Cloud deployment with model artifacts optimized for responsive inference",
    ],
  },
  {
    id: "time-series-forecasting",
    title: "Time Series Forecasting",
    subtitle: "Multi-Horizon Forecasting, Backtesting & Error Analysis",
    description:
      "A forecasting project designed to showcase rigor around temporal validation and business-facing forecast interpretation. " +
      "The build is scoped around demand or subscription forecasting with walk-forward validation, feature engineering, benchmark models, and error decomposition over time.",
    tech: [
      "Python", "Pandas", "Statsmodels", "scikit-learn", "XGBoost",
      "Prophet", "Plotly", "Streamlit",
    ],
    skillsShowcased: [
      "Time Series Forecasting",
      "Backtesting",
      "Feature Engineering",
      "Business Metric Interpretation",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/time-series-forecasting",
    highlights: [
      "Walk-forward backtesting instead of random train/test splits to preserve time order",
      "Comparison of naive baseline, ARIMA/ETS-style models, gradient boosting, and Prophet-style forecasting",
      "Calendar and lag-feature engineering for trend, seasonality, promotions, and external regressors",
      "Forecast error analysis by horizon, season, and event windows to explain where the model wins and fails",
    ],
    recruiterSignals: [
      "Closely matches business forecasting work many data science teams actually need",
      "Shows methodological discipline around leakage prevention and proper temporal evaluation",
      "Connects naturally to your Ford background in demand, subscription, and product analytics",
    ],
    deliverables: [
      "Forecasting pipeline with configurable horizons and walk-forward evaluation",
      "Interactive dashboard with forecast bands, actuals vs predicted, and error diagnostics",
      "Deployment-ready inference service for scoring future periods from uploaded input data",
    ],
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    subtitle: "Ranking, Similarity Search & Personalized Candidate Generation",
    description:
      "A recommender-system project focused on personalized ranking and explainable suggestions. " +
      "The scoped build combines popularity baselines, content-based similarity, and collaborative filtering to show how recommendations improve as richer user-item interactions become available.",
    tech: [
      "Python", "Pandas", "Surprise", "scikit-learn", "Implicit",
      "Sentence Transformers", "Plotly", "Streamlit",
    ],
    skillsShowcased: [
      "Recommendation Systems",
      "Ranking Metrics",
      "Similarity Search",
      "Experiment Design",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/recommendation-system",
    highlights: [
      "Popularity, content-based, and collaborative-filtering recommenders benchmarked side by side",
      "Offline ranking metrics such as Precision@K, Recall@K, MAP, or NDCG to evaluate recommendation quality",
      "Cold-start strategy using metadata embeddings and item similarity when interaction history is sparse",
      "Interactive demo where users choose a profile and inspect recommended items plus explanation traces",
    ],
    recruiterSignals: [
      "Demonstrates ranking and personalization, which are distinct from standard classification work",
      "Shows awareness of both product impact and evaluation methodology for recommender systems",
      "Adds a strong product-analytics and consumer-experience use case to the portfolio",
    ],
    deliverables: [
      "Modeling pipeline for baseline, content, and collaborative recommenders",
      "Evaluation notebook or script with ranking metrics and ablation comparisons",
      "Streamlit experience for interactive recommendations and model explanations",
    ],
  },
  {
    id: "ab-testing-statistical-inference",
    title: "A/B Testing & Statistical Inference",
    subtitle: "Experiment Design, Hypothesis Testing & Causal Decision Support",
    description:
      "A statistics-first project designed to mirror real experimentation work. " +
      "The final build is scoped around randomized test design, power analysis, confidence intervals, uplift estimation, segment analysis, and a results dashboard that explains whether a product change should ship.",
    tech: [
      "Python", "Pandas", "SciPy", "Statsmodels", "NumPy",
      "Plotly", "Streamlit",
    ],
    skillsShowcased: [
      "Experimental Design",
      "Statistical Inference",
      "Power Analysis",
      "Decision Framing",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/ab-testing-statistical-inference",
    highlights: [
      "End-to-end simulated or real experiment with treatment/control cohorts and success metrics",
      "Power and sample-size calculations to justify experiment readiness before launch",
      "Frequentist and practical-significance framing: p-values, confidence intervals, effect sizes, uplift",
      "Segment and heterogeneity analysis to show where treatment effects differ by audience or product usage",
    ],
    recruiterSignals: [
      "Closely aligned with your Ford experience leading A/B testing and DOE work",
      "Shows rigor in decision-making rather than just model building",
      "Demonstrates statistical maturity that many portfolios gloss over",
    ],
    deliverables: [
      "Experiment-analysis pipeline with reusable statistical utilities",
      "Interactive dashboard for sample-size assumptions, test results, and segment breakdowns",
      "Portfolio write-up that frames statistical findings as business recommendations",
    ],
  },
  {
    id: "sql-data-engineering-pipeline",
    title: "SQL & Data Engineering Pipeline",
    subtitle: "Data Modeling, Incremental ETL & Analytical Reporting Layers",
    description:
      "A project showcasing the engineering side of analytics: raw ingestion, data quality enforcement, dimensional modeling, and downstream reporting views. " +
      "The scoped build focuses on SQL-first transformations and reproducible analytics layers suitable for BI dashboards or ML feature stores.",
    tech: [
      "SQL", "Python", "PostgreSQL", "dbt", "Airflow",
      "Docker", "Power BI", "BigQuery",
    ],
    skillsShowcased: [
      "Data Engineering",
      "Data Modeling",
      "ETL / ELT",
      "Analytics Enablement",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/sql-data-engineering-pipeline",
    highlights: [
      "Multi-layer warehouse design: raw, staged, marts, and business-facing reporting outputs",
      "Incremental SQL transformations with tests for uniqueness, nullability, referential integrity, and freshness",
      "Fact and dimension modeling built for both BI consumption and ML feature generation",
      "Pipeline orchestration with scheduled loads and observability around row counts, failures, and latency",
    ],
    recruiterSignals: [
      "Shows you can own the data foundation instead of relying on pre-cleaned datasets",
      "Bridges analytics engineering and data science, which is valuable for smaller teams",
      "Directly reinforces your production data-quality and BigQuery experience",
    ],
    deliverables: [
      "Local or cloud warehouse environment with repeatable seed and transformation scripts",
      "dbt or SQL test suite proving data quality across pipeline stages",
      "Summary dashboard or dataset mart feeding downstream analytics use cases",
    ],
  },
  {
    id: "ml-model-deployment",
    title: "ML Model Deployment (MLOps)",
    subtitle: "Model Serving, Drift Monitoring & CI/CD for Inference Systems",
    description:
      "A model-operations project focused on the production lifecycle after training. " +
      "The scoped build uses a trained predictive model served behind an API, backed by containerization, CI/CD, health checks, batch scoring, and lightweight monitoring for drift and latency.",
    tech: [
      "Python", "FastAPI", "Docker", "Cloud Run", "GitHub Actions",
      "Evidently", "Pandas", "Prometheus",
    ],
    skillsShowcased: [
      "MLOps",
      "Model Serving",
      "Monitoring & Drift Detection",
      "Production Engineering",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/ml-model-deployment",
    highlights: [
      "REST inference API with schema validation, health endpoint, and explicit model versioning",
      "Containerized deployment with CI/CD, automated build, and staged production rollout",
      "Drift and data-quality checks on inference payloads with lightweight monitoring reports",
      "Batch-scoring path to contrast online inference vs scheduled prediction workflows",
    ],
    recruiterSignals: [
      "Makes your production mindset obvious instead of implying it through notebook work",
      "Pairs naturally with the churn prediction project and your Ford-scale deployment experience",
      "Shows you understand the full model lifecycle beyond training and AUC",
    ],
    deliverables: [
      "FastAPI service for prediction requests and artifact loading",
      "Monitoring or reporting job for drift, payload validation, and basic service metrics",
      "Cloud deployment with a documented inference contract and smoke-test workflow",
    ],
  },
  {
    id: "big-data-cloud-analytics",
    title: "Big Data & Cloud Analytics",
    subtitle: "Distributed Processing, Cloud Warehousing & Production-Scale KPIs",
    description:
      "A cloud-focused analytics project designed to demonstrate work at larger scale. " +
      "The scoped build covers raw event ingestion, distributed transformation, warehousing, and KPI-serving layers that emulate the kind of product analytics stack used by subscription and marketplace teams.",
    tech: [
      "Python", "Spark", "BigQuery", "GCP", "Databricks",
      "SQL", "Docker", "Power BI",
    ],
    skillsShowcased: [
      "Big Data Processing",
      "Cloud Analytics",
      "Distributed Compute",
      "KPI Modeling",
    ],
    status: "Scaffolded",
    category: "data-science",
    route: "/personal-projects/big-data-cloud-analytics",
    highlights: [
      "Large synthetic or public event dataset processed with Spark-style transformations and partitioned storage",
      "Cloud warehouse marts built for executive KPI reporting and subscription/product analysis",
      "Performance-aware design with clustering, partitioning, and cost-conscious query patterns",
      "End-to-end flow from raw events to curated business metrics and dashboard-ready tables",
    ],
    recruiterSignals: [
      "Reinforces your experience with BigQuery, GCP, and production analytics at enterprise scale",
      "Shows you can think in terms of pipelines, warehouses, and KPI layers instead of isolated models",
      "Adds a clear large-scale data engineering story to complement ML and experimentation work",
    ],
    deliverables: [
      "Spark or warehouse transformation pipeline over an event-style dataset",
      "Curated KPI tables with documented metric logic and dimensional definitions",
      "Cloud-hosted analytics showcase tied to one or two business-facing dashboards",
    ],
  },
];