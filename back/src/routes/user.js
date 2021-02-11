const router = require('express-promise-router')();

const { user } = require('../controllers');

router.route('/:id').get(user.get);
router.route('/').post(user.create);

module.exports = router;