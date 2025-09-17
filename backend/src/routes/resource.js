const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const auth = require('../middlewares/auth');
const isOwner = require('../middlewares/isOwner');

router.post('/', auth, isOwner, resourceController.create);
router.get('/', auth, isOwner, resourceController.getAll);
router.get('/:id', auth, isOwner, resourceController.getById);
router.put('/:id', auth, isOwner, resourceController.update);
router.delete('/:id', auth, isOwner, isOwner, resourceController.delete);

module.exports = router;
