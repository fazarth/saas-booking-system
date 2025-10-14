import { useRef, useEffect, useState } from "react";

const Dropdown = ({
  button,
  children,
  classNames,
  animation,
  openWrapper,
  setOpenWrapper,
}) => {
  const ref = useRef();
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = openWrapper !== undefined ? openWrapper : internalOpen;
  const toggleOpen = () => {
    if (setOpenWrapper) {
      setOpenWrapper(!openWrapper);
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const close = () => {
    if (setOpenWrapper) {
      setOpenWrapper(false);
    } else {
      setInternalOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpenWrapper]);

  return (
    <div className="relative flex w-full" ref={ref}>
      <div className="flex w-full" onClick={toggleOpen}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-20 ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${isOpen ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
