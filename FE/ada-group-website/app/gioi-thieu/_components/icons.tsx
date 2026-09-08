type IconProps = { className?: string };

export function BuildingIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16h10zm-6-2H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2z" />
      <path d="M22 21V9a2 2 0 0 0-2-2h-6v14h8zm-2-2h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2z" />
    </svg>
  );
}

export function HandshakeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M9 17.95V16C8.45 16 7.97917 15.8042 7.5875 15.4125C7.19583 15.0208 7 14.55 7 14V13L2.2 8.2C2.15 8.5 2.10417 8.8 2.0625 9.1C2.02083 9.4 2 9.7 2 10C2 12.0167 2.6625 13.7833 3.9875 15.3C5.3125 16.8167 6.98333 17.7 9 17.95ZM15.9 15.4C16.5833 14.65 17.1042 13.8125 17.4625 12.8875C17.8208 11.9625 18 11 18 10C18 8.36667 17.5458 6.875 16.6375 5.525C15.7292 4.175 14.5167 3.2 13 2.6V3C13 3.55 12.8042 4.02083 12.4125 4.4125C12.0208 4.80417 11.55 5 11 5H9V7C9 7.28333 8.90417 7.52083 8.7125 7.7125C8.52083 7.90417 8.28333 8 8 8H6V10H12C12.2833 10 12.5208 10.0958 12.7125 10.2875C12.9042 10.4792 13 10.7167 13 11V14H14C14.4333 14 14.825 14.1292 15.175 14.3875C15.525 14.6458 15.7667 14.9833 15.9 15.4Z" />
    </svg>
  );
}

export function FileTextIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
