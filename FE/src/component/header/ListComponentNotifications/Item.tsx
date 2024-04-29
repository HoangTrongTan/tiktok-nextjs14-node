import classNames from "classnames/bind";
import styles from "./ListComponentNotifications.module.scss";
import { useContext } from "react";
import useAuth from '@/hooks/useAuth';

const cx = classNames.bind(styles);

function ItemNotifi({ data, type }: any) {
  const { user : USER } = useAuth(); 
  const renderImg = () => {
    if (data.user instanceof Array) {
      if(data.user.length > 1){
        return (
          <div className={cx("multi-img")}>
            <img className={cx("img1")} src={data?.user[data?.user?.length - 1]?.image} alt="" />
            <img className={cx("img2")} src={data?.user[data?.user?.length - 2]?.image} alt="" />
          </div>
        );
      }
    }else{
      return (
        <img className={cx("img1")} src={data?.user?.image} alt="" /> 
      );
    }
    return (
      <img className={cx("img1")} src={data?.user[data?.user?.length - 1]?.image} alt="" /> 
    );
  };
  const typeItem = () => {
    switch (type) {
      case "likecmt":
        return (
          <>
            <p>đã thích bình luận của bạn. {data?.datelikes}</p>
            {renderChusoHuu()}
          </>
        );
      case "likevd":
        return <p>đã thích video của bạn. {data?.datelikes}</p>;
      case "mentioned":
        return <p>đã nhắn đến bạn trong một video {data?.datelikes}</p>;
      case "comment":
        if(data?.feedback){
          return (
            <>
              <p>đã trả lời bình luận của bạn: {data?.feedback} {data?.datelikes}</p>
              {renderChusoHuu()}
            </>
          );
        }
        return (
          <p>đã bình luận: { data?.noidung }</p>
        )
      default:
        return <p>đã thích bình luận của bạn. {data?.datelikes}</p>;
    }
  };
  const renderName = () => {
    if (data.user instanceof Array) {
      if(data.user.length > 1){
        return (
          <>
            <h3 >{data?.user[data?.user?.length - 1]?.username}</h3>
            <h3 >{data?.user[data?.user?.length - 2]?.username}</h3>
          </>
        );
      }
    }
    return (
      <h3 >{data?.user?.username}</h3>
    );
  }
  const renderChusoHuu = () => {
    return (
      data.noidung && (
        <span>{USER?.name}: {data?.noidung}</span>
      )
    )
  }
  return (
    <div className={cx("item")}>
      {renderImg()}
      <div className={cx("content-info")}>
        {renderName()}
        {typeItem()}
      </div>
      <img
        src={`http://localhost:5432/image/${data?.video?.anhBia}` }
        alt=""
      />
    </div>
  );
}

export default ItemNotifi;
