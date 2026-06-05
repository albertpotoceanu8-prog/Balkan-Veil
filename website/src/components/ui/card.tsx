import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return <div className={className} {...props} />;
}

export function CardContent({ className = "", ...props }: CardProps) {
  return <div className={className} {...props} />;
}
