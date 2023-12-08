import React, { useEffect, useState } from "react";

const Blocked = () => {
  const [blockedUrl, setBlockedUrl] = useState("");

  // Get blocked url from address bar ?site= for value of site
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const site = urlParams.get("site");
    setBlockedUrl(site);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://img.itch.zone/aW1nLzIyMTk3MzUucG5n/original/iVdKq2.png"
        alt="Broken Image"
        className="w-48 h-auto"
      />
      <h1 className="text-2xl mt-5 text-red-500">
        You blocked{" "}
        <span className="inline-flex items-center gap-x-1.5 py-0 px-3 pb-1 rounded-full bg-red-500 text-white">
          {blockedUrl}
        </span>
      </h1>
    </div>
  );
};

export default Blocked;
