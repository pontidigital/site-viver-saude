type BadgeVariant = "primary" | "accent" | "muted" | "success" | "warning" | "danger";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent-dark",
  muted: "bg-gray-100 text-muted",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
