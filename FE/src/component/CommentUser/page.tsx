import { useContext, useEffect, useState } from "react";
import { ChervonDownIcon } from "../../../public/icons/icons";
import style from "./CommentUser.module.scss";
import ItemComment from "./Item";
import * as FeedBackReq from "../../api-service/feedbackComment";
import { VideoPageContext } from "../videopage/VideoPageContext";

function CommentUser({ data }: any) {
  const [feedBackData, setFeedBackData] = useState<any>({ arr: [] });
  const [page, setPage] = useState<Number>(5);
  const [changeComp, setChangeComp] = useState<Number>(-10);
  const [feedBackCount, setFeedBackCount] = useState<any>(0);
  const { newFeedBackComment }: any = useContext(VideoPageContext);
  const setTotalFeedBack = async () => {
    const totalFeedBack: any = await FeedBackReq.countFeedBackComment(data._id);
    setFeedBackCount(totalFeedBack.total);
  };
  useEffect(() => {
    setTotalFeedBack();
  }, [changeComp]);
  // ---
  const setFeedBack = async () => {
    const dataFeedBack = await FeedBackReq.getFeedBackComment(data._id, page);
    const modifiedDataFeedBack = dataFeedBack.arr.map((item: any) => {
      return { ...item, _id: data._id, _id_real: item._id, isFeedBack: true };
    });

    setFeedBackData({
      arr: [...modifiedDataFeedBack],
      total: dataFeedBack.total,
    });
  };
  useEffect(() => {
    // console.log("CHANGECHANGE : ", changeComp , "--" , newFeedBackComment);
    if (Number(page) > 5) {
      setFeedBack();
    }
  }, [page]);

  const handleSeeMore = async () => {
    setFeedBack();
  };
  const hideFeedBack = () => {
    setFeedBackData({ arr: [] });
    setPage(5);
  };

  return (
    <div className={style["wrapper-comp"]}>
      <ItemComment
        data={data}
        setChangeComp={setChangeComp}
        setFeedBack={setFeedBack}
      />

      <div className={style["show-data"]}>
        {feedBackData &&
          feedBackData?.arr?.map((ite: string, i: Number) => {
            return (
              <ItemComment
                smallImg
                data={ite}
                setChangeComp={setChangeComp}
                setFeedBack={setFeedBack}
              />
            );
          })}
        {/* ------------------------------- */}
        {feedBackData?.arr?.length === 0 && (
          <div className={style["see-more"]} onClick={handleSeeMore}>
            {feedBackCount > 0 && (
              <>
                <p>Xem {feedBackCount} câu trả lời</p>
                <span>
                  <ChervonDownIcon />
                </span>
              </>
            )}
          </div>
        )}
        {feedBackData?.arr?.length > 0 && (
          <div className={style["btn-show-when-render"]}>
            <div className={style["show-answer"]}>
              {feedBackData?.total > 0 && (
                <>
                  <p
                    onClick={() => setPage((prev: Number) => Number(prev) + 5)}
                  >
                    Xem {feedBackData?.total} câu trả lời{" "}
                  </p>
                  <span>
                    <ChervonDownIcon />
                  </span>
                </>
              )}
            </div>
            <div className={style["hide"]} onClick={hideFeedBack}>
              <p>Ẩn </p>
              <span>
                <ChervonDownIcon />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentUser;
