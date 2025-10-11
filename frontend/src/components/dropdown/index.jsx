import { useState, useRef, useEffect } from "react";

const Dropdown = ({ button, children, classNames, animation }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative flex w-full" ref={ref}>
      <div className="flex w-full" onClick={() => setOpen(!open)}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-20 ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${open ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
