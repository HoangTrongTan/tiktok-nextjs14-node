const modelLikeVideo = require('../models/like.video.models');
class MiddleWareVideo{
    async checkExistUserLike(req,res,next){
        try{
            const { idUser , idVideo } = req.body;
            const userLike = await modelLikeVideo.findOne({ idUser , idVideo });
            if(userLike){
                req.checkUserLike = true;
                next();
            }else{
                req.checkUserLike = false;
                next();
            }
        }catch(e){
            console.log("Lỗi middlewware video...");
            next(e);
        }
    }
}
module.exports = new MiddleWareVideo();