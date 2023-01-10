const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addCvSection, getCvSections, updateCvSection, deleteCvSection } = require('../controllers/cvSectionController');

router.post('/', protect, addCvSection);
router.get('/', protect, getCvSections);
router.put('/', protect, updateCvSection);
router.delete('/', protect, deleteCvSection);

module.exports = router;