const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menu');

// POST method to add a Menu Item
router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log('Data Saved');
      res.status(200).json(response);
    } catch {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'})
      
    }
})
  
// GET method to get menu data
router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Interrnal Server Error'})
    }
})

// Prametrised APi
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste; // Extraxt the work type from the URL parameter
        if (taste == 'Sour' || taste == 'Sweet' || taste == 'Spicy') {
            const response = await MenuItem.find({ taste: taste });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Work Type' });
        }
    } catch {
        console.log(err);
        res.status(500).json({ error: 'Interrnal Server Error' });
    }
})

// Update person API
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; // Extract the id from the URL parameter
        const updatedMenuData = req.body; // Updated data for the person

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // Return the updated Data
            runValidators: true, // Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu not found!!!' });
        }

        console.log('Data Updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interrnal Server Error' });
    }
})

// DELETE person API
router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; // Extract the id from the URL parameter

        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'Menu not found!!!' });
        }

        console.log('Data Deleted');
        res.status(200).json({message: 'Menu deletes Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interrnal Server Error' });
    }
})

module.exports = router;