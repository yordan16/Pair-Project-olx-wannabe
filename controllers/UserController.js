const{User} = require("../models")
const bcrypt = require("bcryptjs")

class UserController {

    static loginForm(req, res) {
        const { error } = req.query
        res.render('loginForm', {error})
    }
    static registerForm(req, res) {
        res.render('registerForm')
    }
    static postRegister(req, res) {
        const { username, password, role } = req.body
        
        User.create({username, password, role})
        .then(newUser => {
            res.redirect("/login")
        })
        .catch(err => {
            res.send(err)
        })
    }
    static postLogIn(req, res) {
        const {username, password} = req.body
        User.findOne({where : {username}})
        .then(user => {
            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword) {
                    req.session.userId = user.id
                    return res.redirect("/home")
                }
                else {
                    const error = "invalid username or password"
                    return res.redirect(`/login?error=${error}`)
                }
            }
            else {
                const error = "invalid username or password"
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => res.send(err))
    }
    static logOut(req, res) {
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = UserController