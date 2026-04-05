type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20 ${className}`}
    >
      {children}
    </section>
  );
}
