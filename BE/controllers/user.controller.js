const modelUser = require('../models/user.models');
const modelFollowing = require('../models/follow.models');
const modelLikeVideo = require('../models/like.video.models');
const modelVideo = require('../models/video.models');
class User{
    async create(req , res, next){
        try{
            const old = await modelUser.findOne({ sub: req.body.sub }).exec();
            // console.log("OLD:..", old);
            if(!old){
                await modelUser.create({
                    sub: req.body.sub,
                    username: req.body.name,
                    email:req.body.email,
                    image: req.body.picture,
                });
            } 
            res.json( req.body );
        }catch(e){
            console.log("Lỗi:.", e);
            res.status(400).json({ message: "Lỗi thêm user" });
            next(e);
        }
    }
    // [GET] /api/user/get/:id
    async getuser(req,res,next){
        try{
            const { id } = req.params;
            const user = await modelUser.findOne( { sub: id } ).exec();
            const countFollowing = await modelFollowing.countDocuments({ idSender: id , isSuccess: false  });
            const countfollower = await modelFollowing.countDocuments( { idUserMember: { $in : id } } );
            const countVideo = await modelVideo.find({ idChuSoHuu: id });
            let countLikeVideo = 0;
            for (const ite of countVideo) {
                const temp = await modelLikeVideo.countDocuments({ idVideo: ite._id });
                countLikeVideo += temp;
            }
            res.json({...user._doc, countFollowing, countfollower , countLikeVideo });
            // res.json(user);
            // console.log("USER: ", user);
        }catch(e){
            console.log("Lỗi get user", e);
        }
    }
    successGoogleLogin = (req , res) => { 
        if(!req.user) 
            res.status(400).json({ message: "vui lòng đăng nhập lại" }); 
        res.json(req.user);
    }
    
    failureGoogleLogin = (req , res) => { 
        res.status(400).json({ message: "vui lòng đăng nhập lại" }); 
    }
    // [GET] /api/user/name/:name/:own
    async getuserByName(req,res,next){
        try{
            const { name , own } = req.body;
            const regex = new RegExp(name, 'i');  // Tạo regex không phân biệt hoa chữ
            const rs = await modelUser.find({ username: { $ne: own , $regex: regex } });
            res.status(201).json(rs);
        }catch(e){  
            next(e);
            console.log("ERROR get user by name..", e);
        }
    }
}

module.exports = new User;