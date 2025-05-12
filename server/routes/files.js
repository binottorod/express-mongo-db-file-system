const express = require('express');
const router = express.Router();
const File = require('../models/File');

router.post('/', async (req, res) => {
    const { name, extension, folder, size } = req.body;
    const file = new File({ name, extension, folder, size });
    await file.save();
    res.json(file);
});

router.get('/', async (req, res) => {
    const files = await File.find().populate('folder');
    res.json(files);
})

module.exports = router;