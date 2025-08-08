import React from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { OpenInNew, Download } from '@mui/icons-material';
import './MastersProjects.scss';

function MastersProjects() {
    return (
        <Box className="masters-projects" sx={{ py: 8, px: { xs: 2, md: 8 }, background: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Button href="/" variant="contained" color="primary">
                    Back to Home
                </Button>
            </Box>
            <Typography variant="h3" align="center" gutterBottom>Masters Projects</Typography>
            <Box>
                <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ width: '100%' }}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 4, mx: 'auto' }}>
                            <Typography variant="h5">Notion Post Analysis</Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>A detailed analysis of wage disparities across Canadian regions.</Typography>
                            <Button href="https://carnelian-partridge-c1a.notion.site/Economic-and-Gender-Divides-A-Comprehensive-Analysis-of-Wage-Disparities-Across-Canadian-Regions-e3d0e935111a41b295136ac77fe0964c" target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<OpenInNew />}>View Notion Post</Button>
                        </Paper>
                        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 4, mx: 'auto' }}>
                            <Typography variant="h5">In-Depth Analysis of The Movie Database (TMDb)</Typography>
                            <Button href="/In-Depth Analysis of The Movie Database (TMDb).pdf" target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<OpenInNew />}>View PDF</Button>
                            <Button href="/In-Depth Analysis of The Movie Database (TMDb).ipynb" download variant="contained" color="primary" sx={{ ml: 2 }} endIcon={<Download />}>Download Workbook</Button>
                        </Paper>
                        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 4, mx: 'auto' }}>
                            <Typography variant="h5">Calgary Climate Report</Typography>
                            <Button href="Calgary Climate Model Report_603.pdf" target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<OpenInNew />}>View PDF</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 4, mx: 'auto' }}>
                            <Typography variant="h5">Residential Building Costs with Economic Indicators</Typography>
                            <Button href="DATA 602 - Final Report.pdf" target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<OpenInNew />}>View PDF</Button>
                        </Paper>
                        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 4, mx: 'auto' }}>
                            <Typography variant="h5">Calgary CPI Report</Typography>
                            <Button href="Calgary CPI Report.pdf" target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<OpenInNew />}>View PDF</Button>
                        </Paper>
                        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 4, mx: 'auto' }}>
                            <Typography variant="h5">Calgary Mobility App</Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Interactive tool analyzing duration and distance in Calgary.</Typography>
                            <Button href="https://mobility-app-yyc.onrender.com/duration-distance" target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<OpenInNew />}>Visit the Mobility App</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default MastersProjects;