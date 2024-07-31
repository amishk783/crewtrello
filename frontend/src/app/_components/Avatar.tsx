import React from "react";
import Image from "next/image";
import { useAuth } from "../providers/AuthProvider";
interface Props {
  src?: string;
  width?: number;
  height?: number;
  name?: string;
  className?: string;
}

export const Avatar = () => {
  const { user } = useAuth();
  const username = user?.username || "Joe Gardner";
  return (
    <div className="flex  gap-4 items-center py-4">
      <Image
        src="/dashboard/frameavatar.png"
        width={31}
        height={31}
        alt="avatar icon"
      />
      <h2 className="text-black text-xl">{username}</h2>
    </div>
  );
};
