import { useState, useCallback } from "react";

export default function useNeedResourceNotification() {
  const [show, setShow] = useState(false);
  const triggerNotification = useCallback(() => {
    setShow(true);
  }, []);
  const closeNotification = useCallback(() => {
    setShow(false);
  }, []);
  return { show, triggerNotification, closeNotification };
}
