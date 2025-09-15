import React from "react";

// Hapus seluruh hook useOutsideAlerter dari sini
const Dropdown = (props) => {
  const {
    button,
    children,
    classNames,
    animation,
    openWrapper, // Hanya butuh prop ini untuk mengontrol tampilan
  } = props;

  // Hapus juga wrapperRef dan panggilannya
  // Hapus useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div className="relative flex w-full">
      {" "}
      {/* Hapus ref={wrapperRef} */}
      <div className="flex w-full">{button}</div>
      <div
        className={`${classNames} absolute z-20 ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${openWrapper ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
