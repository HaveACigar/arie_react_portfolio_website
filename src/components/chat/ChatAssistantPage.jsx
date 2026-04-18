import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddCommentIcon from "@mui/icons-material/AddComment";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../../auth/AuthContext";

const CHAT_API_URL = process.env.REACT_APP_CHAT_API_URL;

async function authorizedFetch(path, token, options = {}) {
  const response = await fetch(`${CHAT_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export default function ChatAssistantPage() {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const userName = useMemo(() => {
    if (!user) return "";
    return user.displayName || user.email || "Signed-in user";
  }, [user]);

  useEffect(() => {
    async function loadSessions() {
      if (!user || !CHAT_API_URL) return;
      setError("");
      try {
        const token = await user.getIdToken();
        const data = await authorizedFetch("/sessions", token);
        setSessions(data.sessions || []);
        if ((data.sessions || []).length > 0) {
          setActiveSessionId((current) => current || data.sessions[0].id);
        }
      } catch (err) {
        setError("Unable to load chat sessions.");
      }
    }

    loadSessions();
  }, [user]);

  useEffect(() => {
    async function loadSession() {
      if (!user || !activeSessionId || !CHAT_API_URL) return;
      try {
        const token = await user.getIdToken();
        const data = await authorizedFetch(`/sessions/${activeSessionId}`, token);
        setMessages(data.messages || []);
      } catch (err) {
        setError("Unable to load chat history.");
      }
    }

    loadSession();
  }, [user, activeSessionId]);

  async function handleNewChat() {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const data = await authorizedFetch("/sessions", token, {
        method: "POST",
        body: JSON.stringify({ title: "New chat" }),
      });
      const nextSession = {
        id: data.session_id,
        title: data.title,
      };
      setSessions((current) => [nextSession, ...current]);
      setActiveSessionId(data.session_id);
      setMessages([]);
      setDraft("");
    } catch (err) {
      setError("Unable to create a new chat.");
    }
  }

  async function handleSendMessage() {
    if (!user || !draft.trim() || !CHAT_API_URL) return;
    const outgoing = draft.trim();
    setDraft("");
    setBusy(true);
    setError("");
    setMessages((current) => [...current, { id: `local-${Date.now()}`, role: "user", content: outgoing }]);

    try {
      const token = await user.getIdToken();
      const data = await authorizedFetch("/chat", token, {
        method: "POST",
        body: JSON.stringify({
          message: outgoing,
          session_id: activeSessionId,
        }),
      });

      if (!activeSessionId) {
        setActiveSessionId(data.session_id);
      }

      const sessionsData = await authorizedFetch("/sessions", token);
      setSessions(sessionsData.sessions || []);

      const thread = await authorizedFetch(`/sessions/${data.session_id}`, token);
      setActiveSessionId(data.session_id);
      setMessages(thread.messages || []);
    } catch (err) {
      setError("Unable to send your message right now.");
      setMessages((current) => current.slice(0, -1));
      setDraft(outgoing);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", pt: 10, pb: 6, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Paper sx={{ width: { xs: "100%", md: 320 }, p: 2, borderRadius: 3, alignSelf: "stretch" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>ArieAI</Typography>
                <Typography variant="body2" color="text.secondary">
                  Portfolio-aware assistant
                </Typography>
              </Box>
              <SmartToyIcon color="primary" />
            </Stack>

            {loading ? (
              <Box sx={{ py: 4, textAlign: "center" }}><CircularProgress size={28} /></Box>
            ) : !user ? (
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Sign in with Google to start a persistent chat. Your sessions are stored under your account.
                </Typography>
                <Button variant="contained" startIcon={<LoginIcon />} onClick={signInWithGoogle} sx={{ textTransform: "none" }}>
                  Sign in with Google
                </Button>
              </Stack>
            ) : (
              <>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar src={user.photoURL || undefined}>{userName.slice(0, 1)}</Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>{userName}</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>{user.email}</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Button variant="outlined" startIcon={<AddCommentIcon />} onClick={handleNewChat} sx={{ textTransform: "none", flex: 1 }}>
                    New chat
                  </Button>
                  <Button variant="text" color="inherit" startIcon={<LogoutIcon />} onClick={signOutUser} sx={{ textTransform: "none" }}>
                    Sign out
                  </Button>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="overline" color="text.secondary">Recent sessions</Typography>
                <List sx={{ px: 0 }}>
                  {sessions.map((session) => (
                    <ListItemButton
                      key={session.id}
                      selected={session.id === activeSessionId}
                      onClick={() => setActiveSessionId(session.id)}
                      sx={{ borderRadius: 2, mb: 0.5 }}
                    >
                      <ListItemText
                        primary={session.title || "Untitled chat"}
                        primaryTypographyProps={{ noWrap: true, fontWeight: 600 }}
                      />
                    </ListItemButton>
                  ))}
                  {sessions.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                      No chats yet.
                    </Typography>
                  )}
                </List>
              </>
            )}
          </Paper>

          <Paper sx={{ flex: 1, p: 2.5, borderRadius: 3, minHeight: 680, display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Ask about Arie, the site, or any project</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The assistant is restricted to public portfolio knowledge. It will not expose secrets, hidden configuration, or private infrastructure details.
            </Typography>

            {!CHAT_API_URL && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Chat API is not configured yet. Add `REACT_APP_CHAT_API_URL` to the frontend environment.
              </Alert>
            )}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box sx={{ flex: 1, overflowY: "auto", border: "1px solid", borderColor: "divider", borderRadius: 3, p: 2, bgcolor: "background.default" }}>
              {messages.length === 0 ? (
                <Stack spacing={1.5}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Example prompts</Typography>
                  <Typography variant="body2" color="text.secondary">What projects best show Arie&apos;s data science background?</Typography>
                  <Typography variant="body2" color="text.secondary">Summarize Arie&apos;s Ford experience in machine learning and analytics.</Typography>
                  <Typography variant="body2" color="text.secondary">Which live demos are currently available on the site?</Typography>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        alignSelf: message.role === "user" ? "flex-end" : "flex-start",
                        maxWidth: "78%",
                        px: 2,
                        py: 1.5,
                        borderRadius: 3,
                        bgcolor: message.role === "user" ? "primary.main" : "grey.100",
                        color: message.role === "user" ? "primary.contrastText" : "text.primary",
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, display: "block", mb: 0.5 }}>
                        {message.role === "user" ? "You" : "ArieAI"}
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{message.content}</Typography>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                maxRows={5}
                placeholder={user ? "Ask about skills, projects, work experience, or live demos..." : "Sign in to start a persistent chat..."}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={!user || !CHAT_API_URL || busy}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={!user || !CHAT_API_URL || !draft.trim() || busy}
                sx={{ textTransform: "none", minWidth: { sm: 140 } }}
              >
                {busy ? "Sending..." : "Send"}
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
