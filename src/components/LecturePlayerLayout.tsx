import { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import { Lecture } from "@/types/types";
import ProtectedVideoPlayer from "./ProtectedVideoPlayer";


const lectureData: Lecture =
{
    id: 1,
    title: "Lecture 1",
    description: "description of lecture 1",
    videoUrl: "https://cdn.pixabay.com/video/2022/09/20/131990-751915304_large.mp4",

}

    ;

const LecturePlayerLayout = () => {
    const { videoId } = useParams();
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [lectureUrl, setLectureUrl] = useState<string | null>(null);


    useEffect(() => {
        // Reset states when videoId changes
        setLoading(true);
        setProgress(0);

        // Simulate a backend request
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setLoading(false);
                    setLecture(lectureData);
                    setLectureUrl(lectureData.videoUrl as string);
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 300);

        // Cleanup interval on component unmount or videoId change
        return () => clearInterval(interval);
    }, [videoId]); // Add videoId as a dependency

    return (
        <div className="w-full h-full">
            <div className="aspect-video  rounded-lg relative">
                {loading || progress < 100 ? (
                    <div className="absolute top-0 left-0 w-full h-1.5 ">
                        <div
                            className="progress-line h-full  transition-all duration-300 ease-in-out"
                            style={{ width: `${progress}%` }}
                        >
                        </div>
                        <div className="mt-5 w-full">
                            <h1>Loading video {videoId}</h1>
                            <div>
                                <div className="w-full h-[500px] bg-blue-100/40 animate-pulse rounded-md"  ></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        {
                            lecture && !loading && (
                                <div className="mt-5 w-full">
                                    {
                                        lecture &&
                                        <div className=" w-full">
                                            {lectureUrl ? (
                                                <ProtectedVideoPlayer url={lectureUrl} userData={data} />
                                            ) : (
                                                <div>Loading video...</div>
                                            )}
                                        </div>
                                    }
                                </div>
                            )
                        }

                    </div>
                )}

            </div>


        </div>
    );
};

export default LecturePlayerLayout;