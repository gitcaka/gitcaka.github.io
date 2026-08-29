import { Orbit } from 'lucide-react';
export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <span>
        <Orbit />
      </span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
