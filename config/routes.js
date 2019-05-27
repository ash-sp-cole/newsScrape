module.exports = function (Router) {


    Router.get("/", function (req, res) {
        res.render("home")
    });
    Router.get("/saved", function (req, res) {

        res.render("saved")
    });


}