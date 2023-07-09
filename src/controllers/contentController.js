const Content = require('../models/Content');

exports.getAllContents = (req, res) => {
  Content.find()
    .then((contents) => {
      res.json(contents);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Create a new content
exports.create = (req, res) => {
  const { title, text } = req.body;
  const newContent = new Content({ title, text });
  newContent.save()
      .then((savedContent) => {
          res.status(201).json(savedContent);
      })
      .catch((error) => {
          res.status(500).json({ error: 'An error occurred while saving the content.' });
      });
};

// Update an existing content
exports.update = (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  Content.findByIdAndUpdate(id, { title, text }, { new: true })
      .then((updatedContent) => {
          if (!updatedContent) {
              return res.status(404).json({ error: 'Content not found.' });
          }
          res.json(updatedContent);
      })
      .catch((error) => {
          res.status(500).json({ error: 'An error occurred while updating the content.' });
      });
};

// Delete an existing content
exports.delete = (req, res) => {
  const { id } = req.params;
  Content.findByIdAndDelete(id)
      .then((deletedContent) => {
          if (!deletedContent) {
              return res.status(404).json({ error: 'Content not found.' });
          }
          res.json({ message: 'Content deleted successfully.' });
      })
      .catch((error) => {
          res.status(500).json({ error: 'An error occurred while deleting the content.' });
      });
};

// Implement other controller methods for create, update, and delete operations
