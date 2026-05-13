import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: "Los cambios se guardaron correctamente.",
    type: "success",
  },
};

export const Error: Story = {
  args: {
    message: "No se pudieron guardar los cambios.",
    type: "error",
  },
};