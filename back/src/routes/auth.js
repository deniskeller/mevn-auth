const router = require('express-promise-router')();

const { auth } = require('../controllers');

router.route('/login').post(auth.login);
router.route('/signup').post(auth.register);
router.route('/refresh').post(auth.refreshToken);
router.route('/logout').post(auth.logout);

module.exports = router;