import type { Lecture } from "@/types/types"
import { ChevronsLeft, ChevronsRight, CirclePlay } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logoImage from "../assets/logo.png"
import { Button } from "./ui/button"

const DashBoardSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const navigate = useNavigate()

  const lectureData: Lecture[] = [
    {
      id: 1,
      title: "Lecture 1",
      description: "description of lecture 1",
      icon: <CirclePlay className="bg-transparent" />,
    },
    {
      id: 2,
      title: "Lecture 2",
      description: "description of lecture 2",
      icon: <CirclePlay className="bg-transparent" />,
    },
    {
      id: 3,
      title: "Lecture 3",
      description: "description of lecture 3",
      icon: <CirclePlay className="bg-transparent" />,
    },
  ]

  const playVideo = (videoId: number) => {
    navigate(`/video/${videoId}`)
  }
  const playIntroVideo  = ()=>{
    navigate(`/video/introVideo`)
  }

  return (
    <div
      className={`h-full transition-all duration-500 ${
        isCollapsed ? "w-[50px]" : "w-[250px]"
      } bg-gray-800 overflow-hidden`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-2 relative">
          <div className="cursor-pointer absolute right-0 top-2" onClick={() => setIsCollapsed((prev) => !prev)}>
            {isCollapsed ? <ChevronsRight color="white" size={20} /> : <ChevronsLeft color="white" size={20} />}
          </div>
        </div>

        {!isCollapsed && (
          <div className="flex flex-col items-center p-2 space-y-4">
            <div className="w-full px-4">
              <img
                src={logoImage || "/placeholder.svg"}
                alt="logo"
                className="w-full h-auto object-contain max-h-[120px]"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              {isPurchased ? lectureData.map((lecture) => (
                <Button
                  key={lecture.id}
                  className="flex gap-2 items-center w-full justify-center"
                  variant="link"
                  onClick={() => playVideo(lecture.id as number)}
                >
                  {lecture.icon}
                  <span className="text-slate-300">{lecture.title}</span>
                </Button>
              )) :(<>
                 <Button
                  className="flex gap-2 items-center w-full justify-center"
                  variant="link"
                  onClick={playIntroVideo}
                >
                  <span className="text-slate-300">Intro Video</span>
                </Button>
              </>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashBoardSideBar

