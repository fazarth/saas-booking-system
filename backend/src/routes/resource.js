const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const auth = require('../middlewares/auth');

router.post('/', auth, resourceController.create);
router.get('/', auth, resourceController.getAll);
router.get('/:id', auth, resourceController.getById);
router.put('/:id', auth, resourceController.update);
router.delete('/:id', auth, resourceController.delete);

module.exports = router;
