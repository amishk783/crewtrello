import React from "react";
import Image from "next/image";

interface Props {
  src?: string;
  width?: number;
  height?: number;
  name?: string;
  className?: string;
}

export const Avatar = () => {
  return (
    <div className="flex  gap-4 items-center py-4">
      <Image
        src="/dashboard/frameavatar.png"
        width={31}
        height={31}
        alt="avatar icon"
      />
      <h2 className="text-black text-xl">Joe Gardner</h2>
    </div>
  );
};
