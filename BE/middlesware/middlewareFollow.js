const modelLikeFollow = require('../models/follow.models');
class MiddleWareFollow{
    async checkExistUserFollow(req,res,next){
        try{
            const { idUserMember } = req.body;
            const userFollow = await modelLikeFollow.findOne({ idUserMember: {
                $all: idUserMember
            } });
            if(userFollow){
                req.checkUserFollow = true;
                next();
            }else{
                req.checkUserFollow = false;
                next();
            }
        }catch(e){
            console.log("Lỗi middlewware follow...");
            next(e);
        }
    }
}
module.exports = new MiddleWareFollow();