import React from 'react';
import './MastersProjects.scss'; // Import the SCSS file for styling

function MastersProjects() {
    return (
        <div className="masters-projects">
            <h1>Masters Projects</h1>
            <div className="project-item">
                <h2>Notion Post Analysis</h2>
                <p>A detailed analysis of wage disparities across Canadian regions.</p>
                <a href="https://carnelian-partridge-c1a.notion.site/Economic-and-Gender-Divides-A-Comprehensive-Analysis-of-Wage-Disparities-Across-Canadian-Regions-e3d0e935111a41b295136ac77fe0964c" target="_blank" rel="noopener noreferrer" className="notion-link">View Notion Post</a>
            </div>
            <div className="project-item">
                <h2>In-Depth Analysis of The Movie Database (TMDb)</h2>
                <a href="/In-Depth Analysis of The Movie Database (TMDb).pdf" target="_blank" rel="noopener noreferrer" className="pdf-link">View PDF</a>
                <a href="/In-Depth Analysis of The Movie Database (TMDb).ipynb" download className="download-button">Download Workbook</a>
            </div>
            <div className="project-item">
                <h2>Calgary Climate Report</h2>
                <a href="Calgary Climate Model Report_603.pdf" target="_blank" rel="noopener noreferrer" className="pdf-link">View PDF</a>
            </div>
            <div className="project-item">
                <h2>Assessing Residential Building Costs with Economic Indicators in Calgary</h2>
                <a href="DATA 602 - Final Report.pdf" target="_blank" rel="noopener noreferrer" className="pdf-link">View PDF</a>
            </div>
            <div className="project-item">
                <h2>Calgary Mobility App</h2>
                <p>Interactive tool analyzing duration and distance in Calgary.</p>
                <a href="https://mobility-app-yyc.onrender.com/duration-distance" target="_blank" rel="noopener noreferrer" className="notion-link">Visit the Mobility App</a>
            </div>
        </div>
    );
}

export default MastersProjects;