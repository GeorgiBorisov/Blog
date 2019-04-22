const Post = require('../models/post')

exports.addPost = (req, res, next) => {
    const title = req.body.title.trim()
    const image = req.body.image
    const body = req.body.body.trim()
    const post = new Post(title, image, body)
    post.create().then(() => {
        res.redirect('/')
    }).catch(err => console.log(err))
}

exports.listing = (req, res, next) => {
    Post.getAll()
    .then(([posts]) => {
        res.render('postListing',{
            loggedIn: req.session.isLogged,
            posts: posts,
            pageTitle: 'Posts'
        })
    }).catch((err) => {console.log(err)});
}

exports.create = (req, res, next) => {
    res.render('create', {
        loggedIn: req.session.isLogged,
        pageTitle: 'Create post',
        action: 'create'
    })
}

exports.edit = (req, res, next) => {
    Post.getSingle(req.params.postId)
    .then(([posts]) => {
        res.render('create', {
            loggedIn: req.session.isLogged,
            post: posts[0],
            pageTitle: 'Editing post',
            action: 'edit'
        })
    })
    .catch((err) => {console.log(err)})
}

exports.getPost = (req, res, next) => {
    Post.getSingle(req.params.postId)
    .then(([rows]) => {
        res.render('singlePost', {
            loggedIn: req.session.isLogged,
            posts: rows[0],
            pageTitle: rows[0].title,
            fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
        })
    }).catch((err) => {console.log(err)})
}

exports.submitEdited = (req, res, next) => {
    const id = req.body.id
    const title = req.body.title
    const image = req.body.image
    const body = req.body.body
    Post.edit(id, title, image, body)
    .then(
        res.redirect(`/post/${id}`)
    ).catch((err) => {console.log(err)})
}

exports.deletePost = (req, res, next) => {
    const id = req.body.id
    Post.deleteSingle(id)
    .then(
        res.redirect('/posts')
    ).catch((err) => console.log(err))
}