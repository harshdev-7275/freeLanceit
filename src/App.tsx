import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./screens/DashBoard";
import SideBar from "./components/SideBar";
import LecturePlayerLayout from "./components/LecturePlayerLayout";
import { Lecture } from "./types/types";


export default function App({lecture}: {lecture: Lecture}) {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<DashBoard />}>
              <Route path="video/:videoId" element={<LecturePlayerLayout />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}