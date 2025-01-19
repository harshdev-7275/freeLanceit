import { useState } from "react";
import { Lecture } from "@/types/types";
import { ChevronsLeft, ChevronsRight, CirclePlay, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const DashBoardSideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate  = useNavigate();

    const lectureData: Lecture[] = [
        {
            id: 1,
            title: "Lecture 1",
            description: "description of lecture 1",
            icon: <CirclePlay className="bg-transparent"   />,
        },
        {
            id: 2,
            title: "Lecture 2",
            description: "description of lecture 2",
            icon: <CirclePlay className="bg-transparent"   />,
        },
        {
            id: 3,
            title: "Lecture 3",
            description: "description of lecture 3",
            icon: <CirclePlay className="bg-transparent"  />,
        },
    ];
    const playVideo = (videoId: number) => {
        navigate(`/video/${videoId}`);
    };

    return (
        <div
            className={`h-full transition-all duration-500 ${
                isCollapsed ? "w-[50px]" : "w-[250px]"
            } bg-gray-800 overflow-hidden`}
        >
            <div className="container h-full flex flex-col">
                <div className="flex items-center justify-between p-2">
                    {!isCollapsed && (
                        <div className="flex gap-3 items-center">
                            <Search color="white" size={20} />
                            <input
                                type="text"
                                className="outline-none bg-transparent text-white"
                                placeholder="Search...."
                            />
                        </div>
                    )}
                    <div
                        className="cursor-pointer"
                        onClick={() => setIsCollapsed((prev) => !prev)}
                    >
                        {isCollapsed ? (
                            <ChevronsRight color="white" size={20} />
                        ) : (
                            <ChevronsLeft color="white" size={20} />
                        )}
                    </div>
                </div>

                {!isCollapsed && (
                    <div className="mt-10 flex flex-col items-start p-2">
                        <p className="text-slate-500 text-sm ">Lectures</p>
                        <div className="flex flex-col gap-5 mt-5 ">
                            {lectureData.map((lecture) => (
                                <Button key={lecture.id} className="flex gap-1 items-center " variant={"link"} onClick={() => playVideo(lecture.id as number)}>
                                    <div>{lecture.icon}</div>
                                    <div>
                                        <p className="text-slate-300 bg-transparent">{lecture.title}</p>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashBoardSideBar;
