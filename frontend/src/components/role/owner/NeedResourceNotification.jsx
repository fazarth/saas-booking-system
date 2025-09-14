import React from "react";
import PopUpNotification from "components/popup/PopUpNotification";

const NeedResourceNotification = ({ onClose }) => {
  return (
    <PopUpNotification
      type="error"
      message="Anda harus membuat resource terlebih dahulu sebelum melanjutkan"
      onClose={onClose}
    />
  );
};

export default NeedResourceNotification;
