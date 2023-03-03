import React from "react";
import { Tooltip } from "react-tooltip";

function ContactTelIcon({content, type}: any) {
  return (
    <>
    <a href={type}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tooltip-tel"
    >
      <g opacity="0.7">
        <circle cx="8" cy="8" r="8" fill="#9873FF" />
        <path
          d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z"
          fill="white"
        />
      </g>
    </svg>
    </a>
    <Tooltip anchorSelect=".tooltip-tel" content={content}/>
    </>
  );
}

export default ContactTelIcon;
