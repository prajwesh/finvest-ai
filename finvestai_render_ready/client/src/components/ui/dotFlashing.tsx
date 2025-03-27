import React from "react";
import { cn } from "@/lib/utils";

interface DotFlashingProps {
  className?: string;
}

const DotFlashing: React.FC<DotFlashingProps> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: hsl(var(--primary));
          animation: dot-flashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }
        .dot-flashing::before,
        .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: hsl(var(--primary));
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0s;
        }
        .dot-flashing::after {
          left: 15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: hsl(var(--primary));
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 1s;
        }
        @keyframes dot-flashing {
          0% { background-color: hsl(var(--primary)); }
          50%, 100% { background-color: hsl(var(--muted)); }
        }
      `}</style>
      <div className="dot-flashing"></div>
    </div>
  );
};

export default DotFlashing;
