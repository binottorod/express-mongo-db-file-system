const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');

router.post('/', async (req, res) => {
    const { name, parent } = req.body;
    const folder = new Folder({ name, parent });
    await folder.save();
    res.json(folder);
});

router.get('/', async (req, res) => {
    const folders = await Folder.find().populate('parent');
    res.json(folders);
});

module.exports = router;