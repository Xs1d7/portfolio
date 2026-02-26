export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
      {children}
      <span className="mt-2 block h-1 w-12 rounded-full bg-accent" />
    </h2>
  );
}
