import { Outlet } from "react-router-dom";
import DashBoardSideBar from "@/components/DashBoardSideBar";

const DashBoard = () => {
  return (
    <div className="h-full p-5 flex">
      <DashBoardSideBar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;