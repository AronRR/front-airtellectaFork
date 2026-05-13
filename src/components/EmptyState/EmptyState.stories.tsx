import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoData: Story = {
  args: {
    title: "No hay datos disponibles",
    description: "Actualmente no hay información para mostrar.",
  },
};

export const NoResults: Story = {
  args: {
    title: "No se encontraron resultados",
    description: "Intenta cambiar los criterios de búsqueda.",
  },
};