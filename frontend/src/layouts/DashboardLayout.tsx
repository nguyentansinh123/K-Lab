import { Outlet } from "react-router-dom";
import DashboardTopNav from "../components/dashboard/DashboardTopNav";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardTopNav />
      <Outlet />
    </div>
  );
}
