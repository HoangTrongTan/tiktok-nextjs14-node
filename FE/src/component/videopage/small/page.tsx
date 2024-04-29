import style from './VideoSmall.module.scss';

function VideoSmall() {
    return ( <div className={style['wrapper']}>
    {/* ---------------Bên xem video------------ */}
    <div className={style['video-watching']}>
        <h1>Small</h1>
    </div>
    {/* ------------------end ----------------- */}
    {/* -----------------Bên chức năng khác----- */}
    <div className={style['actions-other']}>

    </div>
    {/* ------------------end ----------------- */}
</div > );
}

export default VideoSmall;