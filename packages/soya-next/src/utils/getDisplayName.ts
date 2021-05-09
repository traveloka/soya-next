import type { ComponentType } from "react";

export default function getDisplayName<TProps extends object>(
  prefix: string,
  Component: ComponentType<TProps>
) {
  const name = Component.displayName || Component.name || "Component";
  return `${prefix}(${name})`;
}
