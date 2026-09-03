type IconProps = { className?: string };

const shared = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconHistorico({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M6 3.5h9l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V5A1.5 1.5 0 0 1 6.5 3.5Z" />
      <path d="M14.5 3.5V8h4.3" />
      <path d="M8.5 12h7M8.5 15h7M8.5 9h3" />
    </svg>
  );
}

export function IconAlerta({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 4a5.5 5.5 0 0 1 5.5 5.5c0 4.2 1.3 5.6 2 6.3H4.5c.7-.7 2-2.1 2-6.3A5.5 5.5 0 0 1 12 4Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
      <circle cx="17.5" cy="6" r="2.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconAbastecimento({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M5 20V6a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 13 6v14" />
      <path d="M4 20h10" />
      <path d="M13 9.5h2l2.3 2.3c.4.4.7 1 .7 1.6V17a1.3 1.3 0 0 1-2.6 0v-1.2c0-.6-.5-1.1-1.1-1.1H13" />
      <circle cx="18" cy="8.2" r="1.2" />
      <path d="M7 8h4" />
    </svg>
  );
}

export function IconVeiculos({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M4 15.5v-2.8c0-.5.2-1 .5-1.4l1.8-2.3c.4-.5 1-.8 1.6-.8h8.2c.6 0 1.2.3 1.6.8l1.8 2.3c.3.4.5.9.5 1.4v2.8" />
      <path d="M3.5 15.5h17v2A1.5 1.5 0 0 1 19 19h-1a1.5 1.5 0 0 1-1.5-1.5v-.5h-9v.5A1.5 1.5 0 0 1 6 19H5a1.5 1.5 0 0 1-1.5-1.5v-2Z" />
      <circle cx="7.5" cy="15.5" r="1.4" />
      <circle cx="16.5" cy="15.5" r="1.4" />
      <path d="M4 11.5h16" />
    </svg>
  );
}

export function IconDashboard({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 15.5v-3M12 15.5v-6M16 15.5v-4.5" />
    </svg>
  );
}

export function IconDocumento({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V8h4.3" />
      <path d="m9 14.2 1.8 1.8L15.3 12" />
    </svg>
  );
}

export function IconBrasil({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 20.5s6.5-5.6 6.5-11A6.5 6.5 0 0 0 5.5 9.5c0 5.4 6.5 11 6.5 11Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}
