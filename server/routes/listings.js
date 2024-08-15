const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

const { getListing, upload, uploadMultiple } = require('./middleware.js')

// Get all
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.where("resolved").equals("false");
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get by user
router.get('/user/:user', async (req, res) => {
    try {
        const listings = await Listing.where("user").equals(req.params.user);
        res.json(listings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
})

// Get one
router.get('/:id', getListing, (req, res) => {
    res.json(res.listing);
});

// Create one
router.post('/', upload.array("files"), uploadMultiple, async (req, res) => {
    const listing = new Listing ({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        user: req.body.user,
        imgPaths: req.paths
    });
    try {
        const newListing = await listing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one
router.patch('/:id', getListing, (req, res) => {

});

// Delete one
router.delete('/:id', getListing, async (req, res) => {
    try {
        await res.listing.deleteOne();
        res.json({ message: "Deleted Listing" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



module.exports = router;