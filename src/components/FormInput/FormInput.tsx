type FormInputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  error?: string;
  type?: string;
};

export function FormInput({
  label,
  placeholder = "",
  value = "",
  error = "",
  type = "text",
}: FormInputProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <label
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#1e293b",
        }}
      >
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: `1px solid ${error ? "#dc2626" : "#cbd5e1"}`,
          outline: "none",
          fontSize: "14px",
          fontWeight: 500,
          color: "#1e293b",
          backgroundColor: "#ffffff",
        }}
      />

      {error ? (
        <span
          style={{
            color: "#dc2626",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}