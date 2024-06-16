//================================== ROUTING ==================================//

//---------------------------------- items ------------------------------------//
//dependencies(backend/routes/items.js)
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const upload = require('./uploads'); 

//GET all itmes
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//CREATE a new listing with a photo -optional
router.post('/', upload.single('photo'), async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    owner: req.body.owner,
    photo: req.file.filename,//Save its filename on db
    condition: req.body.condition,
    category: req.body.category
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get a single item--not used currently
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET route for fetching all items
router.get('/', async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//Update item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    item.owner = req.body.owner;

    if (req.file) {
      item.photo = req.file.filename; //Update the filename if a new photo is uploaded
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;
