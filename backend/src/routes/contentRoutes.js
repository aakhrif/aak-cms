const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Define the routes
router.get('/', contentController.getAllContents);
router.post('/', contentController.create);
router.put('/:id', contentController.update);
router.delete('/:id', contentController.delete);

module.exports = router;
