type PlaceholderFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function PlaceholderFrame({
  children,
  className = "",
}: PlaceholderFrameProps) {
  return (
    <div
      className={`rounded-lg border border-dashed border-stone-300 bg-stone-50/80 px-6 py-12 text-center ${className}`}
    >
      {children}
    </div>
  );
}
