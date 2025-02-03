import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="h-full p-5 flex">
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;