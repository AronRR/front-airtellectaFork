type PrimaryButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function PrimaryButton({
  label,
  disabled = false,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#94a3b8" : "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        width: "100%",
      }}
    >
      {label}
    </button>
  );
}