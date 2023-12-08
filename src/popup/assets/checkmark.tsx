import React from "react";

const Checkmark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={92}
    height={92}
    viewBox="0 0 92 92"
    id="checkmark"
    {...props}
  >
    <path d="M34.4 72c-1.2 0-2.3-.4-3.2-1.3L11.3 50.8c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0l16.8 16.7 39.9-39.8c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4l-43.1 43c-1 .9-2.1 1.3-3.3 1.3z" />
  </svg>
);
export default Checkmark;
