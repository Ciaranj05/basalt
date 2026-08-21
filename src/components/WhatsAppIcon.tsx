export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.2 18.9 6 15.8a7.1 7.1 0 1 1 2.7 2.5l-3.5.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.3c.1.3 0 .5-.1.6l-.4.5c-.1.1-.1.3 0 .5.4.7 1 1.3 1.8 1.8.2.1.3.1.5 0l.6-.4c.2-.1.4-.2.6-.1l1.3.6c.3.1.4.3.4.6v.4c0 .3-.1.6-.4.8-.5.3-1.1.5-1.8.3-2.6-.6-4.7-2.6-5.4-5.1-.2-.7-.1-1.1.1-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
