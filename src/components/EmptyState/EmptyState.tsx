type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      style={{
        padding: "24px",
        border: "1px dashed #cbd5e1",
        borderRadius: "12px",
        textAlign: "center",
        backgroundColor: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#1e293b" }}>{title}</h3>
      <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
        {description}
      </p>
    </div>
  );
}