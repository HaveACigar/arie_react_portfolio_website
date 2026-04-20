import React from "react";

const FITNESS_LOG_URL = "https://arieai-chat-log--fitness-app-4a84c.us-central1.hosted.app/";

export default function FitnessLogRoutePage() {
  return (
    <main style={{ width: "100%", minHeight: "calc(100vh - 120px)", padding: "90px 16px 24px" }}>
      <section style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Fitness Log</h1>
        <p style={{ margin: 0, color: "#475569" }}>
          This route keeps you on your portfolio domain path while loading your Fitness Log app below.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href={FITNESS_LOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 14px",
              borderRadius: 10,
              textDecoration: "none",
              background: "#0f766e",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Open in new tab
          </a>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "14px auto 0", border: "1px solid #dbe2ea", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
        <iframe
          title="Fitness Log"
          src={FITNESS_LOG_URL}
          style={{ width: "100%", height: "78vh", border: "none", display: "block" }}
          loading="lazy"
        />
      </section>
    </main>
  );
}
