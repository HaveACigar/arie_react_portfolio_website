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
const CHAT_API_FALLBACKS = [
  CHAT_API_URL,
  "https://site-knowledge-chat-api-v7z4vnunqa-uc.a.run.app",
  "https://site-knowledge-chat-api-1044248854820.us-central1.run.app",
].filter(Boolean);

async function fetchWithApiFallback(path, options = {}) {
  let lastError = null;
  const attempts = [];

  for (const baseUrl of CHAT_API_FALLBACKS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);
      return { response, baseUrl, attempts };
    } catch (err) {
      // Retry next known API host on low-level network failures.
      attempts.push({
        baseUrl,
        type: "network",
        name: err?.name || "Error",
        message: err?.message || "Unknown network error",
      });
      lastError = err;
    }
  }

  const networkError = lastError || new Error("NetworkError when attempting to fetch resource.");
  networkError.diagnostic = {
    path,
    method: options?.method || "GET",
    attempts,
  };
  throw networkError;
}

function createDiagnosticLine(context, err) {
  const diagnostic = err?.diagnostic || {};
  const attempts = Array.isArray(diagnostic.attempts) && diagnostic.attempts.length > 0
    ? diagnostic.attempts.map((a) => `${a.baseUrl} -> ${a.type}: ${a.name || "Error"}: ${a.message || "n/a"}`).join(" | ")
    : "none";

  const lines = [
    `time=${new Date().toISOString()}`,
    `context=${context}`,
    `name=${err?.name || "Error"}`,
    `message=${err?.message || "Unknown error"}`,
    `method=${diagnostic.method || "n/a"}`,
    `path=${diagnostic.path || "n/a"}`,
    `host=${diagnostic.baseUrl || "n/a"}`,
    `status=${diagnostic.status || "n/a"}`,
    `attempts=${attempts}`,
  ];

  return lines.join("\n");
}

async function parseErrorResponse(response) {
  let message = `Request failed with status ${response.status}`;
  try {
    const body = await response.json();
    if (body?.detail) {
      message = body.detail;
    }
  } catch {
    const text = await response.text();
    if (text) {
      message = text;
    }
  }
  return message;
}

async function authorizedFetch(path, token, options = {}) {
  const { response, baseUrl, attempts } = await fetchWithApiFallback(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await parseErrorResponse(response);
    const responseError = new Error(message);
    responseError.diagnostic = {
      path,
      method: options?.method || "GET",
      baseUrl,
      status: response.status,
      attempts,
    };
    throw responseError;
  }

  return response.json();
}

async function publicFetch(path, options = {}) {
  const { response, baseUrl, attempts } = await fetchWithApiFallback(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await parseErrorResponse(response);
    const responseError = new Error(message);
    responseError.diagnostic = {
      path,
      method: options?.method || "GET",
      baseUrl,
      status: response.status,
      attempts,
    };
    throw responseError;
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
  const [notice, setNotice] = useState("");
  const [diagnosticLine, setDiagnosticLine] = useState("");

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
        setError(`Unable to load chat sessions. ${err.message || ""}`.trim());
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
        setError(`Unable to load chat history. ${err.message || ""}`.trim());
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
      setError(`Unable to create a new chat. ${err.message || ""}`.trim());
    }
  }

  async function handleSendMessage() {
    if (!draft.trim() || !CHAT_API_URL) return;
    const outgoing = draft.trim();
    setDraft("");
    setBusy(true);
    setError("");
    setNotice("");
    setDiagnosticLine("");
    setMessages((current) => [...current, { id: `local-${Date.now()}`, role: "user", content: outgoing }]);

    try {
      if (user) {
        const data = await publicFetch("/chat/public", {
          method: "POST",
          body: JSON.stringify({ message: outgoing }),
        });
        setMessages((current) => [
          ...current,
          { id: `assistant-${Date.now()}`, role: "assistant", content: data.answer || "No response returned." },
        ]);
        setNotice("Logged-in send is temporarily using guest mode due a network compatibility issue. Messages from this session are not being saved yet.");
      } else {
        const data = await publicFetch("/chat/public", {
          method: "POST",
          body: JSON.stringify({ message: outgoing }),
        });
        setMessages((current) => [
          ...current,
          { id: `assistant-${Date.now()}`, role: "assistant", content: data.answer || "No response returned." },
        ]);
      }
    } catch (err) {
      setDiagnosticLine((current) => current || createDiagnosticLine("send_final", err));
      setError(`Unable to send your message right now. ${err.message || ""}`.trim());
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
                  You can chat right away without signing in.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in with Google if you want your chats to be saved and available later.
                </Typography>
                <Button variant="contained" startIcon={<LoginIcon />} onClick={signInWithGoogle} sx={{ textTransform: "none" }}>
                  Sign in to save chats
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

            {!user && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Guest mode is active. You can chat now, but chats are only saved when signed in.
              </Alert>
            )}

            {!CHAT_API_URL && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Chat API is not configured yet. Add `REACT_APP_CHAT_API_URL` to the frontend environment.
              </Alert>
            )}
            {notice && <Alert severity="info" sx={{ mb: 2 }}>{notice}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {diagnosticLine && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Debug details to share
                </Typography>
                <Typography component="pre" variant="caption" sx={{ m: 0, whiteSpace: "pre-wrap" }}>
                  {diagnosticLine}
                </Typography>
              </Alert>
            )}

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
                placeholder={user ? "Ask about skills, projects, work experience, or live demos..." : "Ask a question now, or sign in to save your chats..."}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={!CHAT_API_URL || busy}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={!CHAT_API_URL || !draft.trim() || busy}
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
