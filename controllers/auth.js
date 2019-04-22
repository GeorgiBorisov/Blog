const Auth = require('../models/auth')

exports.authView = (req, res, next) => {
    let view = ''
    if(req.route.path == '/register' || req.route.path == '/login') {
        view = req.route.path.slice(1)
        res.render('auth', {
            loggedIn: req.session.isLogged,
            view: view,
            action: req.route.path,
            pageTitle: view,
            buttonLabel: view,
        })
    } else if (req.route.path == '/update') {
        view = 'Update profile'
        Auth.userInfo(req.session.user)
        .then(([userInfo]) => {
            console.log(userInfo[0])
            res.render('auth', {
                loggedIn: req.session.isLogged,
                view: view,
                action: req.route.path,
                pageTitle: view,
                buttonLabel: view,
                user: userInfo[0]
            })
        }).catch((err) => { console.log(err) })
    }
}

exports.register = (req, res, next) => {
    const username = req.body.user.trim()
    const password = req.body.pass.trim()
    const email = req.body.email.trim()
    const confirmedPass = req.body.confirm.trim()
    if(password === confirmedPass) {
        Auth.checkName(username)
        .then((result) => {
            if(!result[0].length){
                const account = new Auth(username, password, email)
                account.create()
                .then(() => {
                    signIn(req, username)    
                    res.redirect('/login')
                }).catch((err) => console.log(err))
            } else {
                res.redirect('/register')
            }
        }).catch((err) => {console.log(err)})
    }
}
exports.login = (req, res, next) => {
    const username = req.body.user.trim()
    const password = req.body.pass.trim() 
    Auth.log(username, password)
    .then(([user]) => {
        signIn(req, user[0].username)
        res.redirect('/')
    }).catch((err) => {console.log(err)})
}

const signIn = (req, user) => {
    req.session.isLogged = true
    req.session.user = user
    return
}

exports.update = (req, res, next) => {
    if(req.body.pass === req.body.confirm){
        const username = req.body.user
        const pass = req.body.pass
        const email = req.body.email
        Auth.verify(req.body.oldpass)
        .then(([result]) => {
            if(result[0]) {
                const updatedUser = {
                    username: username,
                    pass: pass,
                    email: email,
                    oldpass: result[0].password
                }
                Auth.update(updatedUser)
                .then(() => {
                    res.redirect('/login')
                }).catch((err) => {console.log(err)})
            } else {
                console.log(1)
            }
        }).catch((err) => { console.log(err) })
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err)
        } else {
            res.clearCookie('connect.sid')
            res.redirect('/')
        }
    })
}