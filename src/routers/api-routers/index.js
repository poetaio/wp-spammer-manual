const Router = require('express');
const router = new Router();
const emailRouter = require('./email_router');
const messageRouter = require('./message_router');

router.use('/email', emailRouter);
router.use('/message', messageRouter);

module.exports = router;
