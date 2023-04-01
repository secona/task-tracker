import { Dashboard } from "@/components/Dashboard"
import { Outlet } from "react-router-dom";

export const Index = () => {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
}