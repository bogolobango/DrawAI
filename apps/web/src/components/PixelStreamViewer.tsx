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
    // Pixel Streaming connection will be established here.
    // In production, this integrates with UE5's Pixel Streaming WebRTC signaling server.
    // For now, show placeholder state.
    const timer = setTimeout(() => {
      setStatus("connecting");
    }, 1000);

    return () => clearTimeout(timer);
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <p className="text-sm font-medium text-[var(--color-danger)]">
            Connection failed
          </p>
          <button
            className="glass-button text-xs"
            onClick={() => setStatus("connecting")}
          >
            Retry
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
