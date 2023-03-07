import React, { Children, ReactNode } from "react";

interface Modal {
  children: ReactNode;
  open: boolean | (() => void);
  onClose: () => void;
}

export function Modal({ children, open, onClose }: Modal) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} className="modal__bg">
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <button onClick={onClose} className="modal__close">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2333 7.73333L21.2666 6.76666L14.4999 13.5334L7.73324 6.7667L6.76658 7.73336L13.5332 14.5L6.7666 21.2667L7.73327 22.2333L14.4999 15.4667L21.2666 22.2334L22.2332 21.2667L15.4666 14.5L22.2333 7.73333Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
