import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className = "", type = "button", variant, ...props }: ButtonProps) {
  void variant;
  return <button type={type} className={className} {...props} />;
}
