export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? 'logo-mark logo-mark-compact' : 'logo-mark'}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40">
        <path
          d="M8 8v13c0 7 3 11 8 11 4 0 6-2 7-6 1 4 3 6 7 6 2 0 3-.4 4-1.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="30" cy="9" r="3" fill="currentColor" />
        <path
          d="M16 18C21 13 24 12 30 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
      </svg>
    </span>
  );
}
