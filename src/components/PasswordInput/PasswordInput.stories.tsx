import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: "Contraseña",
    placeholder: "Ingresa tu contraseña",
    error: "",
  },
};

export const Error: Story = {
  args: {
    label: "Contraseña",
    placeholder: "Ingresa tu contraseña",
    error: "La contraseña es obligatoria",
  },
};