import VideoLarge from "@/component/videopage/large/page";
import VideoPage from "@/component/videopage/page";
import VideoSmall from "@/component/videopage/small/page";

function DetailVideo(props: any) {
  console.log("props..", props);
  
  return (
    <><VideoPage props={props} /> </>
  );
}

export default DetailVideo;
