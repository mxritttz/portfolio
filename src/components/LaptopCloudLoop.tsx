import React from "react";

export default function LaptopCloudLoop() {
  return (
    <div className="pointer-events-none absolute z-50 inset-0 flex items-center justify-center">
      <div className="cloud-loop-anim">
        <video
          preload="auto"
          src="/1204.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-[60%] aspect-[16/9] h-auto -translate-y-56 -translate-x-60 cloud-appear"
        />
      </div>
    </div>
  );
}
