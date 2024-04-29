import { useContext, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { VideoProvider } from "./VideoContext";
import VideoItem from "./videoItem/page";
import axios from "axios";
import useAuth from '@/hooks/useAuth';

function HomePage() {
  const [data, setData] = useState<any>([]);
  const { user } = useAuth();
  const getDataVideos = async () => {
    try {
      const res: any = await axios.get(`http://localhost:5432/api/video/${user?.sub}`);
      // console.log(">>>REST API:. ", res.data);
      setData(res.data);
    } catch (e) {
      console.log(">>>Lỗi lấy dữ liệu: ", e);
    }
  };
  useEffect(() => {
    

    getDataVideos();
  }, [user]);
  // console.log("data videos:...", data);

  return (
    <VideoProvider>
      <div className={styles["wrapper"]}>
        {data &&
          data?.map((item: any, i: any) => {
            return (
              <VideoItem
                key={i}
                data={item}
                getDataVideos={getDataVideos}
              />
            );
          })}
      </div>
    </VideoProvider>
  );
}

export default HomePage;
