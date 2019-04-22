const Post = require('../models/post')

exports.home = (req, res, next) =>{
    Post.featured()
    .then(([posts]) => {
        res.render('app', {
            loggedIn: req.session.isLogged,
            faeturedPosts: posts,
            pageTitle: 'Home',
            path: '/'
        })
    }).catch((err) => {console.log(err)});
}

