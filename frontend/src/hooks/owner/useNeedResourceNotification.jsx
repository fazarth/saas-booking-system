import { useState } from "react";

export default function useNeedResourceNotification() {
  const [show, setShow] = useState(false);

  const triggerNotification = () => {
    setShow(true);
  };

  const closeNotification = () => {
    setShow(false);
  };

  return { show, triggerNotification, closeNotification };
}
