type BinaryStarProps = {
  size?: number
  className?: string
}

// The signature motif: two stars in mutual orbit — the visual shorthand for "us"
export default function BinaryStar({ size = 28, className = '' }: BinaryStarProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="orbit-ring absolute left-[12%] top-[32%] w-[76%] h-[36%]" />
      <span
        className="orbit-a bg-ember"
        style={{ width: '20%', height: '20%', boxShadow: '0 0 6px rgba(232,168,87,0.8)' }}
      />
      <span
        className="orbit-b bg-quartz"
        style={{ width: '15%', height: '15%', boxShadow: '0 0 5px rgba(217,141,152,0.8)' }}
      />
    </div>
  )
}
