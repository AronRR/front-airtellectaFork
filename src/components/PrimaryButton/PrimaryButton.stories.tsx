import type { Meta, StoryObj } from "@storybook/react";
import { PrimaryButton } from "./PrimaryButton";

const meta: Meta<typeof PrimaryButton> = {
  title: "Components/PrimaryButton",
  component: PrimaryButton,
};

export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: {
    label: "Continuar",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Continuar",
    disabled: true,
  },
};