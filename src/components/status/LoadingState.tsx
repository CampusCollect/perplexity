interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center text-text-secondary">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p>{message}…</p>
    </div>
  );
}
