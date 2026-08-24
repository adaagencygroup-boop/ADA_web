type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
};

export default function Marquee({
  children,
  className = "",
  durationSeconds = 30,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={`group relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${className}`}
    >
      <div
        className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${durationSeconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
