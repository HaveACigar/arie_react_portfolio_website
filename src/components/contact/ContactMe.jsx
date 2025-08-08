import { useContext, useState } from "react";
import { ThemeContext } from "../../context";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { Box, Button, TextField, Typography, Paper, CircularProgress } from "@mui/material";

export default function ContactMe() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
      });
      alert("Thank you for your message! I will try and respond as soon as I am able.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      alert("There was an error sending your message. Please try again later.");
    }
    setLoader(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: darkMode ? '#222' : 'linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)' }}>
      <Box sx={{
        maxWidth: 480,
        width: '100%',
        background: darkMode ? '#222' : '#fff',
        borderRadius: 12,
        padding: '32px 36px',
        boxShadow: '0 2px 12px rgba(25, 118, 210, 0.08)',
        border: darkMode ? '1px solid #444' : '1px solid #e3f0ff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Button href="/" variant="outlined" color="primary" sx={{ alignSelf: 'flex-start', mb: 2 }}>
          Back to Home
        </Button>
        <Typography variant="h4" gutterBottom sx={{ color: darkMode ? '#90caf9' : '#1976d2', fontWeight: 700, mb: 2, letterSpacing: 1 }}>
          Contact Me
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            InputProps={{ style: { background: darkMode ? '#444' : '#fff', color: darkMode ? '#fff' : '#222' } }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{ style: { background: darkMode ? '#444' : '#fff', color: darkMode ? '#fff' : '#222' } }}
          />
          <TextField
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            multiline
            minRows={4}
            InputProps={{ style: { background: darkMode ? '#444' : '#fff', color: darkMode ? '#fff' : '#222' } }}
          />
          <Button type="submit" variant="contained" color="primary" disabled={loader} sx={{ fontWeight: 600, py: 1.2, mt: 1 }}>
            {loader ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
