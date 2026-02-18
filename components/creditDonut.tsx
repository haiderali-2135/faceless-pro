"use client";

interface CreditDonutProps {
  used: number;
  total: number;
  size?: number;
}

export function CreditDonut({ used, total, size = 64 }: CreditDonutProps) {
  const percentage = Math.min((used / total) * 100, 100);
  const remaining = 100 - percentage;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const usedLength = (percentage / 100) * circumference;
  const remainingLength = (remaining / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="transform -rotate-90"
    >
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="#FFFFFF61"
        strokeWidth="6"
      />
      s
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="#00BFCD"
        strokeWidth="6"
        strokeDasharray={`${usedLength} ${remainingLength}`}
        strokeLinecap="round"
      />
    </svg>
  );
}
