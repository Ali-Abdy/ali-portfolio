import type { ComponentProps } from "react";
export default function ExternalLink(props: ComponentProps<"a">) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
