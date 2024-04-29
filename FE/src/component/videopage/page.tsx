"use client";
import { useEffect } from "react";
import { VideoPageProvider } from "./VideoPageContext";
import VideoLarge from "./large/page";
import VideoSmall from "./small/page";
import { useRouter, usePathname } from "next/navigation";
import { AuthContextProvder } from "@/context/AuthContext/page";

function VideoPage({ props }: any) {
  // const type = localStorage.getItem("history-video");
  // localStorage.removeItem("history-video");
  return (
    <AuthContextProvder>
      <VideoPageProvider>
        {/* {type? <VideoLarge /> : <VideoSmall />} */}
        <VideoLarge props={props} />
      </VideoPageProvider>
    </AuthContextProvder>
  );
}

export default VideoPage;
