import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="px-72">
        <Outlet />
      </div>
    </>
  );
}
