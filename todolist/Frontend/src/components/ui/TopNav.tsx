import React, { type ReactElement } from "react";
import { ModeToggle } from "./mode-toggle";


interface TopNavProps {
    sidebar:ReactElement;
}
function TopNav({sidebar}:TopNavProps) {
  return (
    <div className="w-full flex justify-between items-center border-b">
      <div className="flex gap-5">
        {sidebar}
        <div>Xyrone</div>
        <div>|</div>
        <div>Home</div>
      </div>
      <div className="mb-5">
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}

export default TopNav;
