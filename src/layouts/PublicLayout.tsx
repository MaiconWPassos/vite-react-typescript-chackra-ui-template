import Footer from "@/components/public/Footer";
import Navbar from "@/components/public/Navbar";

import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicLayout;
