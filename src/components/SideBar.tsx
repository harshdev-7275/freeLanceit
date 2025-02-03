import { HandCoins, Hexagon, LayoutDashboard, LogOut } from "lucide-react";
import {  useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const SideBar = () => {
    const routes = [
        {
            path: "/",
            name: "Dashboard",
            icon: <LayoutDashboard className="bg-transparent"  />
        },
        {
            path: "/payment",
            name: "Payment",
            icon: <HandCoins className="bg-transparent" />
        }
    ];
    let navigate = useNavigate();
    const activeRoute = window.location.pathname;
    console.log(activeRoute);
    const navigateTo = (path: string) => {
        navigate(path);
        
    }

    return (
        <div className="h-screen w-20 bg-transparent text-white flex flex-col items-center py-5">
            <div className="mb-16">
                <Hexagon color="blue" size={30} />
            </div>
            <div className="flex flex-col items-center gap-10 flex-grow">
                {routes.map((route, index) => (
                    <Button
                        key={index}
                        variant={"link"}
                        size={"icon"}
                        onClick={() => navigateTo(route.path)}
                        className={`rounded-lg transition-colors duration-300 hover:bg-blue-500 ${activeRoute === route.path ? "bg-blue-500" : ""}`}
                        title={route.name}
                        style={{ color: "blue" } }
                    >
                         {route.icon}
                    </Button>
                ))}
            </div>
            <div className="mt-auto">
                <div className="p-3 rounded-lg transition-colors duration-300 hover:bg-red-500">
                    <LogOut />
                </div>
            </div>
        </div>
    );
};

export default SideBar;
