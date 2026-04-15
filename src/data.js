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
      "Matplotlib",
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
      "Firebase",
      "Hive",
      "Spark",
      "MariaDB",
      "MySQL",
      "PHP",
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
    id: 1,
    title: "React Portfolio Website",
    description:
      "Architected and deployed a professional data science portfolio leveraging GCP and Generative AI principles, showcasing high-impact projects.",
    tech: ["React", "MUI", "SCSS", "GCP", "Firebase"],
    status: "Ongoing",
    category: "both",
    link: "https://www.arieswebsite.com",
  },
  {
    id: 2,
    title: "Economic & Gender Divide Analysis",
    description:
      "Comprehensive analysis of wage disparities across Canadian regions, presented at YYC DataCon 2024.",
    tech: ["Python", "Pandas", "Visualization", "Statistics"],
    status: "Complete",
    category: "data-science",
    link: "https://carnelian-partridge-c1a.notion.site/Economic-and-Gender-Divides-A-Comprehensive-Analysis-of-Wage-Disparities-Across-Canadian-Regions-e3d0e935111a41b295136ac77fe0964c",
  },
  {
    id: 3,
    title: "TMDb Movie Analysis",
    description:
      "Leveraged predictive Machine Learning models to forecast future film success using The Movie Database.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    status: "Complete",
    category: "data-science",
    link: "/In-Depth Analysis of The Movie Database (TMDb).pdf",
  },
  {
    id: 4,
    title: "Calgary Mobility App",
    description:
      "Interactive tool analyzing transit duration and distance in Calgary with real-time data.",
    tech: ["Python", "Dash", "Plotly", "GeoPandas"],
    status: "Complete",
    category: "data-science",
    link: "https://mobility-app-yyc.onrender.com/duration-distance",
  },
  {
    id: 5,
    title: "Calgary Climate Model Report",
    description:
      "Climate modeling and statistical analysis of Calgary weather patterns.",
    tech: ["R", "Statistical Modeling", "ggplot2"],
    status: "Complete",
    category: "data-science",
    link: "/Calgary Climate Model Report_603.pdf",
  },
  {
    id: 6,
    title: "Residential Building Costs Analysis",
    description:
      "Analysis of residential building costs correlated with economic indicators.",
    tech: ["Python", "Regression", "Pandas"],
    status: "Complete",
    category: "data-science",
    link: "/DATA 602 - Final Report.pdf",
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
  // { id: "supervised-ml-pipeline", title: "Supervised ML: Prediction Pipeline", ... },
  // { id: "nlp-text-analytics", title: "NLP & Text Analytics", ... },
  // { id: "deep-learning-image-classifier", title: "Deep Learning Image Classifier", ... },
  // { id: "time-series-forecasting", title: "Time Series Forecasting", ... },
  // { id: "recommendation-system", title: "Recommendation System", ... },
  // { id: "ab-testing-statistical-inference", title: "A/B Testing & Statistical Inference", ... },
  // { id: "sql-data-engineering-pipeline", title: "SQL & Data Engineering Pipeline", ... },
  // { id: "ml-model-deployment", title: "ML Model Deployment (MLOps)", ... },
  // { id: "big-data-cloud-analytics", title: "Big Data & Cloud Analytics", ... },
];