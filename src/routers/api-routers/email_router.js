const Router = require('express');
const router = new Router();
const emailController = require('../../controllers/api-controllers/EmailController');

router.get('/', emailController.getAll);
router.post('/', emailController.create);
router.get('/:emailId', emailController.getOne);
router.put('/:emailId', emailController.update);
router.delete('/:emailId', emailController.delete);
router.post('/send-spam', emailController.sendSpam);

module.exports = router;
