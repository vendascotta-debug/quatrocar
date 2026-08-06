export function RoadPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-40 sm:h-32"
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="50"
        x2="800"
        y2="50"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="28 22"
        className="text-amber-400"
      />
    </svg>
  );
}
