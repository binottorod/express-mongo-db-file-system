const express = require("express");
const router = express.Router();
const File = require("../models/File");
const queries = require("../utils/queries");

// Create a new file
router.post("/", async (req, res) => {
  try {
    const { name, extension, folder, size } = req.body;
    const file = new File({ name, extension, folder, size });
    await file.save();
    res.status(201).json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get files with optional filters
router.get("/", async (req, res) => {
  try {
    const { ext, minSize, folderName, recent, imagesOnly } = req.query;

    let files;

    if (ext) {
      files = await queries.getFilesByExtension(ext);
    } else if (minSize) {
      files = await queries.getLargeFiles(Number(minSize));
    } else if (folderName) {
      files = await queries.getFilesInFolderByName(folderName);
    } else if (recent) {
      files = await queries.getRecentFiles(Number(recent));
    } else if (imagesOnly) {
      files = await queries.getRecentImages(Number(imagesOnly));
    } else {
      files = await queries.getFilesWithFolders(); // default
    }

    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
