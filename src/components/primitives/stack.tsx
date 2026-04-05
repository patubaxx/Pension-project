type StackProps = {
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

const gapClass = {
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-10",
} as const;

export function Stack({ gap = "md", children, className = "" }: StackProps) {
  return (
    <div className={`flex flex-col ${gapClass[gap]} ${className}`}>
      {children}
    </div>
  );
}
