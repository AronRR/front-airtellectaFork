type ToastProps = {
  message: string;
  type: "success" | "error";
};

export function Toast({ message, type }: ToastProps) {
  const isSuccess = type === "success";

  return (
    <div
      style={{
        width: "320px",
        padding: "12px 16px",
        borderRadius: "8px",
        color: isSuccess ? "#166534" : "#991b1b",
        backgroundColor: isSuccess ? "#dcfce7" : "#fee2e2",
        border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
        fontWeight: 600,
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {message}
    </div>
  );
}