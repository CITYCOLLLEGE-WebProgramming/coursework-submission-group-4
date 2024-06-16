const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');//forgot the decleration...

const app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());
app.use(cors());//installed cors to avoid error retrieving the items even though http://localhost:3000/items returns the JSON with the items correctly
app.use(express.urlencoded({ extended: true }));

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/trading-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../backend/uploads/')));//check?
app.use(express.static(path.join(__dirname, '../public')));

//File upload setup | multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../backend/uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images Only!'));
    }
  };
  
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1 },
    fileFilter: fileFilter 
}).single('photo');


//Define routes
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
//const surveyRouter = require('./routes/surveys');

//Mount items to the router
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
//app.use('/surveys', surveyRouter);

// Serve index.html for any other routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../backend/uploads/'));//fixed directory path from the server to the codebase
});

// Delete item endpoint
app.delete('/items/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      // Find item by ID and delete it
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
  
      // Optionally, you can also delete associated photo file from uploads directory
      // fs.unlinkSync(path.join(__dirname, 'uploads', deletedItem.photo));
  
      res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ success: false, message: 'Error deleting item' });
    }
  });


//Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
