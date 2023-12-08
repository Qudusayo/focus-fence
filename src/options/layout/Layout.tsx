import React from "react";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-4 h-screen bg-gradient-to-r to-[#383B3E] from-[#040507] p-4">
      <Sidebar />
      <div className="col-span-3 py-4 overflow-y-auto">{children}</div>
    </div>
  );
}
