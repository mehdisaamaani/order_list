import React, { ReactNode } from "react";
import NavbarHeader from "../component/header";

const AppBar = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavbarHeader />
      {children}
    </div>
  );
};

export default AppBar;
