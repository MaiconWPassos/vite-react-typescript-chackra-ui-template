import { Routes, Route } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import PublicLayout from "@/layouts/PublicLayout";

import HomePage from "@/pages/public/Home";

import SignIn from "@/pages/app/SignIn";
import Dashboard from "@/pages/app/Dashboard";
import ProductsList from "@/pages/app/Products/List";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route path="app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="products/list" element={<ProductsList />} />
      </Route>
    </Routes>
  );
}
