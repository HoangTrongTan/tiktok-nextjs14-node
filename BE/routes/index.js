require('../passport');
const routeUser = require("./user.route");
const authengg = require("./authen.google");
const routeVideo = require("./video.route");
const routeFollow = require("./follow.route");
const routeComment = require("./comment.route");
const routeChatMessage = require("./chat.route");
const routeNotifi = require("./notification.route");
const routeFavourites = require("./favourites.route");
const routeFeedBackComment = require("./comment.feedback.route");


function routers(app){
    app.use("/api/user", routeUser );
    app.use("/auth/google", authengg);
    app.use("/api/video", routeVideo );
    app.use("/api/follow", routeFollow );
    app.use("/api/notifi" , routeNotifi);
    app.use("/api/comment", routeComment );
    app.use("/api/favourites", routeFavourites );
    app.use("/api/chat-message", routeChatMessage );
    app.use("/api/feed-back-comment", routeFeedBackComment );
}
module.exports = routers;