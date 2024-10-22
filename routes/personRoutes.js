const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { generateToken } = require('./../jwt');

// POST route to add person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains the person data
  
        // Create a new Person document using the Moongose model
        const newPerson = new Person(data);
  
        // Save the new person data to the database
        const response = await newPerson.save();
        console.log('data saved');

        const token = generateToken(response.username);
        console.log("Token is: ", token);
        
        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interrnal Server Error' });
    }
});

// GET method for get person data
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interrnal Server Error' });
    }
});

// Parametrised api
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extraxt the work type from the URL parameter
        if (workType == 'Chef' || workType == 'Waiter' || workType == 'Manager') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Work Type' });
        }
    } catch {
        console.log(err);
        res.status(500).json({ error: 'Interrnal Server Error' });
    }
});

// Update person API
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated Data
            runValidators: true, // Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found!!!' });
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
        const personId = req.params.id; // Extract the id from the URL parameter

        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found!!!' });
        }

        console.log('Data Deleted');
        res.status(200).json({message: 'person deletes Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interrnal Server Error' });
    }
})


module.exports = router;