const express = require("express");
const auth = require("../middleware/auth");
const { uploadImageToS3 } = require("../middleware/s3-handlers");
const Admin = require("../models/adminModel");
const Movie = require("../models/movieModel");
const generateAuthToken = require('../utils/jwt');
const { saveTokenInRedis, deleteTokenInRedis } = require('../utils/redis-utils')
const router = new express.Router();



router.post("/admin/login", async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await Admin.findByCredentials(email, password);
        const token = generateAuthToken(user);
        await saveTokenInRedis(token);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000, sameSite: true });
        res.send(user);
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "מייל או סיסמה אינם תקינים",
        });
    }
});

// LogOut
router.post("/admin/logout", async (req, res) => {
    try {
        const token = req.cookies.jwt;
        await deleteTokenInRedis(token);
        res.cookie('jwt', '', { httpOnly: true, maxAge: 0 });
        res.send("Logout successfully");
    } catch (err) {
        res.status(500).send();
    }
});


// router.get("/admin/get-movie/:movieName", auth, async (req, res) => {
router.get("/admin/get-movie/:movieName", auth, async (req, res) => {
    const searchParameter = { 'movieDetails.nameInHebrew': req.params.movieName };
    console.log("get-movie");
    try {
        const movies = await Movie.findOne(searchParameter);
        res.send(movies)
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: 400,
            message: err.message,
        });
    }
});


router.post("/admin/test", auth, uploadImageToS3, async (req, res) => {
    try {
        const newMovie = new Movie({
            movieDetails: { ...req.body },
            Dates: []
        });
        let result = await newMovie.save();
        console.log(result);
        res.send("ggn");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});




module.exports = router;








// router.post("/admin/signup", async (req, res) => {
//     const admin = new Admin(req.body);

//     try {
//         await admin.save();
//         const token = generateAuthToken(admin);
//         await saveTokenInRedis(token);
//         res.status(201).send({ admin, token });
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({
//             status: 400,
//             message: err.message,
//         });
//     }
// });