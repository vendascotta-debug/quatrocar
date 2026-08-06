export function CarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 22c0-1.1.9-2 2-2h1.2l3.6-7.8A5 5 0 0 1 17.3 9h18.4a5 5 0 0 1 4.5 2.8L44 19h5c2.8 0 5 2.2 5 5v3a2 2 0 0 1-2 2h-3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 22v3a2 2 0 0 0 2 2h3M14 22h27"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="27" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="45" cy="27" r="4" stroke="currentColor" strokeWidth="2.2" />
      <path d="M15 9v10M27 9v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
