const Router = require('express');
const router = new Router();
const path = require("path");
const {messageController, emailController} = require("../../controllers/front-controllers");

const VIEWS_PATH = path.resolve(__dirname, '../../views');

router.set('view engine', 'pug');
router.set('views', VIEWS_PATH);

router.get('/', emailController.home);
router.get('/messages', messageController.messages);

module.exports = router;
