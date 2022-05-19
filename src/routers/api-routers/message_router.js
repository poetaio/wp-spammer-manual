const Router = require('express');
const router = new Router();
const messageController = require('../../controllers/api-controllers/MessageController');

router.get('/', messageController.getAllPaginated);
router.get('/all', messageController.getAll);
router.post('/', messageController.create);
router.get('/:messageId', messageController.getOne);
router.put('/:messageId', messageController.update);
router.delete('/:messageId', messageController.delete);

module.exports = router;
