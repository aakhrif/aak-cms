const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contentRoutes = require('./src/routes/contentRoutes');
const userRoutes = require('./src/routes/userRoutes');
const ejs = require('ejs');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const DB_NAME = process.env.MONGO_DATABASE;
const DB_HOST = process.env.MONGO_HOST;

// Connect to MongoDB
mongoose
  .connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contents', contentRoutes);

app.post('/api/dynamics', (req, res) => {
  console.log('body', req.body);
  const { name, fields } = req.body;

  // Generate the controller code from the template
  const controllerTemplate = fs.readFileSync('./src/templates/controller.ejs', 'utf-8');
  const controllerCode = ejs.render(controllerTemplate, { name });

  // Generate the model code from the template
  const modelTemplate = fs.readFileSync('./src/templates/model.ejs', 'utf-8');
  const modelCode = ejs.render(modelTemplate, { modelName: name, fields: fields });

  // Generate the routes code from the template
  const routesTemplate = fs.readFileSync('./src/templates/routes.ejs', 'utf-8');
  const routesCode = ejs.render(routesTemplate, { name });

  // Write the generated code to the respective files
  fs.writeFileSync(`./src/controllers/${name}Controller.js`, controllerCode);
  fs.writeFileSync(`./src/models/${name}.js`, modelCode);
  fs.writeFileSync(`./src/routes/${name.toLowerCase()}Routes.js`, routesCode);

  res.status(200).json({ message: 'Files generated successfully.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});