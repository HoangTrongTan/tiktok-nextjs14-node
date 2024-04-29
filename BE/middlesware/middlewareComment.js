const modelLikeComment = require('../models/like.comment.models');
class MiddleWareVideo{
    async checkExistUserLikeComment(req,res,next){
        try{
            const { idComment, idUser } = req.body;
            const userLikeCmm = await modelLikeComment.findOne({ idUser , idComment });
            if(userLikeCmm){
                req.checkUserLikeComment = true;
                next();
            }else{
                req.checkUserLikeComment = false;
                next();
            }
        }catch(e){
            console.log("Lỗi middlewware video...");
            next(e);
        }
    }
}
module.exports = new MiddleWareVideo();