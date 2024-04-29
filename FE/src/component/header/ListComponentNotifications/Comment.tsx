import ItemNotifi from "./Item";
import classNames from "classnames/bind";
import styles from "./ListComponentNotifications.module.scss";
import { useContext } from "react";
import { GlobalContextNotifi } from "../GlobalContextNotifi";
const cx = classNames.bind(styles);

function Comments() {
  const { listComments , listCommentsFeedBack } : any = useContext(GlobalContextNotifi);
 
  return (
    <div>
      <p className={cx('date-text')}>Trước đây</p>
      {
        listComments && listComments.map( (item : any, i:any ) => (
          <ItemNotifi type={"comment"} data={item} key={i} />
        ) )
      }
      {
        listCommentsFeedBack && listCommentsFeedBack.map( (item : any, i:any ) => (
          <ItemNotifi type={"comment"} data={item} key={i} />
        ) )
      }
    </div>
  );
}

export default Comments;
