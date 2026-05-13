type ErrorBannerProps = {
  message: string;
  actionLabel?: string;
};

export function ErrorBanner({ message, actionLabel }: ErrorBannerProps) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
        borderRadius: "8px",
        padding: "12px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <span style={{ fontSize: "14px", fontWeight: 600 }}>{message}</span>

      {actionLabel ? (
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#991b1b",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}