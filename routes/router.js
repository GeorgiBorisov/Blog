const express = require('express')

const auth = require('../middleware/authMiddleware')

const mainController = require('../controllers/main')
const postController = require('../controllers/post')
const authController = require('../controllers/auth')

const router = express.Router()

router.get('/', mainController.home)

router.get('/create', auth, postController.create)
router.get('/posts', auth, postController.listing)
router.get('/post/:postId', auth, postController.getPost)
router.get('/editPost/:postId', auth, postController.edit)

router.post('/create', auth, postController.addPost)
router.post('/edit', auth, postController.submitEdited)
router.post('/delete', auth, postController.deletePost)

router.get('/login', authController.authView)
router.get('/register', authController.authView)
router.get('/update', auth, authController.authView)
router.get('/logout', auth, authController.logout)

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/update', auth, authController.update)

module.exports = router;