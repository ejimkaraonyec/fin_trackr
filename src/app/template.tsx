export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-screen-md py-4 rounded-md border">
      {children}
    </div>
  );
}
