const modelFav = require('../models/favourites.models');
class MiddleWareFavourites{
    async checkExistUserFavourites(req,res,next){
        try{
            const { idUser , idVideos } = req.body;
            const userLike = await modelFav.findOne({ idUser , idVideos });
            if(userLike){
                req.checkUserFavourites = true;
                next();
            }else{
                req.checkUserFavourites = false;
                next();
            }
        }catch(e){
            console.log("Lỗi middlewware video...");
            next(e);
        }
    }
}
module.exports = new MiddleWareFavourites();