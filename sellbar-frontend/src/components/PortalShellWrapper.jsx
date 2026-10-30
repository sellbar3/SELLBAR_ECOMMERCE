"use client";

import { useEffect } from "react";

export default function PortalShellWrapper({ children, className = "" }) {
  useEffect(() => {
    document.body.classList.add("portal-shell-active");
    return () => {
      document.body.classList.remove("portal-shell-active");
    };
  }, []);

  return (
    <div data-portal-shell="true" className={className}>
      {children}
    </div>
  );
}
