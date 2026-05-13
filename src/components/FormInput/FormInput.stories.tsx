import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "./FormInput";

const meta: Meta<typeof FormInput> = {
  title: "Components/FormInput",
  component: FormInput,
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: {
    label: "Correo electrónico",
    placeholder: "Ingresa tu correo",
    error: "",
  },
};

export const Error: Story = {
  args: {
    label: "Correo electrónico",
    placeholder: "Ingresa tu correo",
    error: "Este campo es obligatorio",
  },
};