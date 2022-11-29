const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createCvItem, getCvItems, updateCvItem, deleteCvItem } = require('../controllers/cvItemController');

router.post('/', protect, createCvItem);
router.get('/', protect, getCvItems);
router.put('/', protect, updateCvItem);
router.delete('/', protect, deleteCvItem);

module.exports = router;