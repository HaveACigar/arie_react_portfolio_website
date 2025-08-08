import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { ThemeContext } from "../context";

// Example data, merge from Portfolio and Works
const categories = [
  {
    id: "react",
    title: "React",
    items: [
      // Add your reactPortfolio items here
    ],
  },
  {
    id: "angular",
    title: "Angular",
    items: [
      // Add your angularPortfolio items here
    ],
  },
  {
    id: "works",
    title: "Works",
    items: [
      {
        id: "1",
        title: "Masters Works",
        description: "This is where I will post projects from my time at the University of Calgary",
        image: "./assets/Calgary_Logo.png",
        link: "/mastersprojects",
      },
      {
        id: "2",
        title: "Java Works",
        description: "This is where I will post projects involving Java, OOP and backend work",
        image: "./assets/java.png",
      },
      {
        id: "3",
        title: "Web Works",
        description: "This is where I will post projects involving webdesign and frontend work",
        image: "./assets/website.png",
      },
      {
        id: "4",
        title: "Undergrad Works",
        description: "This is where I will post projects from my time at EMU",
        image: "./assets/EMU.png",
      },
    ],
  },
];

export default function PortfolioWorks() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const currentCategory = categories[selectedTab];

  return (
    <Box className="portfolio" id="portfolio" sx={{ bgcolor: darkMode ? "grey.900" : "grey.100", color: darkMode ? "grey.100" : "grey.900", minHeight: "100vh", py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>Portfolio & Works</Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        sx={{ mb: 3 }}
      >
        {categories.map((cat) => (
          <Tab key={cat.id} label={cat.title} />
        ))}
      </Tabs>
      <Box className="container" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
        {currentCategory.items.map((item) => (
          <Box key={item.id} className="item" sx={{ width: 250, height: 250, borderRadius: 3, border: "1px solid lightgray", m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: darkMode ? "grey.800" : "white", boxShadow: 2, position: "relative", transition: "all .5s ease", cursor: "pointer", ":hover": { bgcolor: "primary.main", color: "white" } }}>
            {item.image && (
              <img src={item.image} alt={item.title} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10, marginBottom: 12 }} />
            )}
            <Typography variant="h6" align="center">{item.title}</Typography>
            {item.description && (
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>{item.description}</Typography>
            )}
            {item.link && (
              <Link to={item.link} style={{ textDecoration: "underline", fontWeight: 600, marginTop: 8, color: "inherit" }}>
                Projects
              </Link>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
