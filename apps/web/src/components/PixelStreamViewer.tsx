import { useEffect, useRef, useState } from "react";

interface PixelStreamViewerProps {
  signalingUrl: string;
  className?: string;
}

export default function PixelStreamViewer({
  signalingUrl,
  className = "",
}: PixelStreamViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"connecting" | "connected" | "error">(
    "connecting"
  );

  useEffect(() => {
    // Attempt WebSocket connection to the UE5 signaling server.
    // If the server is unreachable, transition to error after a short timeout.
    setStatus("connecting");

    let ws: WebSocket | null = null;
    let timeout: ReturnType<typeof setTimeout>;

    try {
      ws = new WebSocket(signalingUrl);

      ws.onopen = () => {
        clearTimeout(timeout);
        setStatus("connected");
      };

      ws.onerror = () => {
        clearTimeout(timeout);
        setStatus("error");
      };

      ws.onclose = () => {
        setStatus("error");
      };
    } catch {
      setStatus("error");
    }

    // Fallback timeout — if no response within 4 seconds, show error
    timeout = setTimeout(() => {
      if (ws) ws.close();
      setStatus("error");
    }, 4000);

    return () => {
      clearTimeout(timeout);
      if (ws) ws.close();
    };
  }, [signalingUrl]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}
    >
      {status === "connecting" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-[var(--color-border)] border-t-[var(--color-primary)]" />
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--color-text)]">
              Connecting to UE5 Pixel Stream
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {signalingUrl}
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-danger)]/10">
            <svg className="h-6 w-6 text-[var(--color-danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)]">
              UE5 Stream Unavailable
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
              No Unreal Engine 5 Pixel Streaming server was found at{" "}
              <span className="font-mono">{signalingUrl}</span>. Start the UE5 instance to enable live 3D visualization.
            </p>
          </div>
          <button
            className="glass-button text-xs"
            onClick={() => setStatus("connecting")}
          >
            Retry Connection
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        autoPlay
        playsInline
        muted
      />
    </div>
  );
}
