import { useEffect } from "react";
import { createPortal } from "react-dom";

const createPortalWrapp = () => {
  const portal = document.createElement("div");
  portal.id = "portal-wrapper";
  return portal;
};

const protalWrappElm = createPortalWrapp();

const Portal = ({ children }) => {
  useEffect(() => {
    document.body.appendChild(protalWrappElm);
  }, []);
  return createPortal(children, protalWrappElm);
};

export default Portal;
