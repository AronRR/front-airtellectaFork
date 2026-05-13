import { useState } from "react";

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
};

export function PasswordInput({
  label,
  placeholder = "Ingresa tu contraseña",
  error = "",
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

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

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          style={{
            flex: 1,
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

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            padding: "0 12px",
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            color: "#2563eb",
          }}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>

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