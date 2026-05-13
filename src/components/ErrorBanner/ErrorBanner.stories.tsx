import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBanner } from "./ErrorBanner";

const meta: Meta<typeof ErrorBanner> = {
  title: "Components/ErrorBanner",
  component: ErrorBanner,
};

export default meta;
type Story = StoryObj<typeof ErrorBanner>;

export const Default: Story = {
  args: {
    message: "Ocurrió un error inesperado.",
  },
};

export const WithAction: Story = {
  args: {
    message: "Ocurrió un error inesperado.",
    actionLabel: "Reintentar",
  },
};