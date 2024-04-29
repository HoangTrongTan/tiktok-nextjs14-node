import classNames from "classnames/bind";
import style from './Profile.module.scss';
import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";
const cx = classNames.bind(style);

function Actions() {
    const { data , getUser} : any = useContext(ProfileContext);
    return ( <>
        <div className={cx('actions-wrap')}>
            <p className={cx('item-actions')}>
                <span>{data?.countFollowing}</span>
                <span>Đang Follow</span>
            </p>
            <p className={cx('item-actions')}>
                <span>{data?.countfollower}</span>
                <span>Follower</span>
            </p>
            <p className={cx('item-actions')}>
                <span>{data?.countLikeVideo}</span>
                <span>Thích</span>
            </p>

        </div>
    </> );
}

export default Actions;