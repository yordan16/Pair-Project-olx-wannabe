const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("hello")
})
router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)
router.get("/login", UserController.loginForm)
router.post("/login", UserController.postLogIn)
router.get('/logout', UserController.logOut)
router.use(function(req, res, next) {
    if (!req.session.userId) {
     const error = "Please login first"
     res.redirect(`/login?error=${error}`)
    }
    else {
        next()
    }
})

router.get('/home', (req,res) => res.render('home'))


module.exports = router