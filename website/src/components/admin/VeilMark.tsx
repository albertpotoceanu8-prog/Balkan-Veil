type VeilMarkProps = {
  className?: string;
  size?: number;
};

export function VeilMark({ className = "", size = 52 }: VeilMarkProps) {
  return (
    <img
      src="/assets/veil-mark-shape.png"
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
      }}
    />
  );
}
