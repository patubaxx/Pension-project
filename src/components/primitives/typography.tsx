type KickerProps = { children: React.ReactNode; className?: string };
export function Kicker({ children, className = "" }: KickerProps) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.2em] text-stone-500 ${className}`}
    >
      {children}
    </p>
  );
}

type DisplayTitleProps = { children: React.ReactNode; className?: string };
export function DisplayTitle({ children, className = "" }: DisplayTitleProps) {
  return (
    <h1
      className={`text-balance font-serif text-4xl font-normal leading-tight tracking-tight text-stone-900 sm:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};
export function SectionTitle({
  children,
  className = "",
  id,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={`font-serif text-2xl font-normal tracking-tight text-stone-900 sm:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}

/** Standalone route title (h1). Use on methodology, sources, errors, etc. */
type PageTitleProps = { children: React.ReactNode; className?: string };
export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1
      className={`font-serif text-2xl font-normal tracking-tight text-stone-900 sm:text-3xl ${className}`}
    >
      {children}
    </h1>
  );
}

type LeadProps = { children: React.ReactNode; className?: string };
export function Lead({ children, className = "" }: LeadProps) {
  return (
    <p
      className={`max-w-2xl text-pretty text-lg leading-relaxed text-stone-600 sm:text-xl ${className}`}
    >
      {children}
    </p>
  );
}

type BodyProps = { children: React.ReactNode; className?: string };
export function Body({ children, className = "" }: BodyProps) {
  return (
    <p className={`text-base leading-relaxed text-stone-600 ${className}`}>
      {children}
    </p>
  );
}
