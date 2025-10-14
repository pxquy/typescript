import { Outlet } from "react-router";
import FooterClient from "./footer-client";
import HeaderClient from "./header-client";

const ClientLayout = () => {
  return (
    <>
      <HeaderClient />
      <Outlet />
      <FooterClient />
    </>
  );
};

export default ClientLayout;
