import { useState, useEffect } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { Lecture } from "@/types/types";
import ProtectedVideoPlayer from "./ProtectedVideoPlayer";
import introLecture from "../assets/videos/introVideo.mp4"


const lectureData: Lecture =
{
    id: 1,
    title: "Lecture 1",
    description: "description of lecture 1",
    videoUrl: "",

}


const LecturePlayerLayout = () => {
    const { videoId } = useParams();
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [lectureUrl, setLectureUrl] = useState<string | null>(null);
    const [isPurchased, setIsPurchased] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        setProgress(0);
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

        return () => clearInterval(interval);
    }, [videoId]);

    const handleVideoComplete = () => {
        navigate('/payment');
      };


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

                    !isPurchased ? (
                        <>
                            <div className="w-full">
                                {
                                    introLecture && !loading && (
                                        <div className="mt-5 w-full">
                                            {
                                                lecture &&
                                                <div className=" w-full">
                                                    {introLecture ? (
                                                        <ProtectedVideoPlayer url={introLecture} userData={data} onComplete={handleVideoComplete}/>
                                                    ) : (
                                                        <div>Loading video...</div>
                                                    )}
                                                </div>
                                            }
                                        </div>
                                    )
                                }


                            </div>
                        </>) : (
                        <>
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
                        </>
                    )
                )}

            </div>


        </div>
    );
};

export default LecturePlayerLayout;