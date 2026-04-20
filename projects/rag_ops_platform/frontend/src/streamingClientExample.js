export async function streamAsk({
  apiBaseUrl,
  payload,
  onToken,
  onMetadata,
  onBlocked,
  onDone,
}) {
  const response = await fetch(`${apiBaseUrl}/ask/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Streaming request failed (${response.status}).`);
  }

  const decoder = new TextDecoder();
  const reader = response.body.getReader();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() || "";

    for (const frame of frames) {
      let eventName = "message";
      let data = "{}";

      for (const line of frame.split("\n")) {
        if (line.startsWith("event:")) {
          eventName = line.slice("event:".length).trim();
        } else if (line.startsWith("data:")) {
          data = line.slice("data:".length).trim();
        }
      }

      let parsed;
      try {
        parsed = JSON.parse(data);
      } catch {
        continue;
      }

      if (eventName === "token") onToken?.(parsed.text || "");
      if (eventName === "metadata") onMetadata?.(parsed);
      if (eventName === "blocked") onBlocked?.(parsed.reason || "Blocked by guardrails.");
      if (eventName === "done") onDone?.(parsed);
    }
  }
}
