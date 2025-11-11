interface PlaceholderProps {
  title: string;
  description?: string;
}

export const Placeholder = ({ title, description }: PlaceholderProps) => (
  <div className="space-y-4 rounded-2xl border border-white/5 bg-surface/80 p-10 text-center shadow-lg">
    <h1 className="font-display text-3xl font-semibold text-white">{title}</h1>
    <p className="text-sm text-textSecondary">
      {description ?? 'This surface is coming soon. Use the navigation or keyboard shortcuts to explore other areas.'}
    </p>
  </div>
);
