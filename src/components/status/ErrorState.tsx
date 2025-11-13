interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', description, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="rounded-full bg-destructive/10 p-3 text-destructive">
        <span aria-hidden>!</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        {description ? <p className="mt-1 max-w-xs text-sm text-text-secondary">{description}</p> : null}
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md border border-border px-3 py-2 text-sm text-text-primary hover:bg-overlay"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
