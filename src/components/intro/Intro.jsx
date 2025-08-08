import { useContext, useEffect, useRef } from "react"
import { Box, Typography, Paper, Avatar, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { init } from "ityped";
import "./intro.scss"
import { ThemeContext } from "../../context"

export default function Intro() {

    const textRef = useRef();
    useEffect(()=>{
        init(textRef.current, { 
            showCursor: false,
            backDelay: 1500,
            backSpeed: 60,
            showCursor: true, 
            strings: ['website!', 'workshop!'] 
        });
    }, []);
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    return (
        <div className="intro" id="intro">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ minHeight: '80vh', width: '100%' }}>
                <Avatar src="assets/Arie_Profile_Pic.jpg" alt="A picture of me" sx={{ width: 180, height: 180, boxShadow: 3, mb: 4 }} />
                <Paper elevation={4} sx={{ p: 4, borderRadius: 3, background: darkMode ? '#222' : '#fff', boxShadow: 3, minWidth: { xs: '90vw', sm: 400 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" style={{color: darkMode ? '#555' : undefined}}>Hello! My name is</Typography>
                    <Typography variant="h2" style={{color: darkMode ? '#555' : undefined}}>Arie DeKraker</Typography>
                    <Typography variant="h5" style={{color: darkMode ? '#555' : undefined}}>and welcome to my <span ref={textRef}></span></Typography>
                </Paper>
            </Box>
        </div>
    )
}
