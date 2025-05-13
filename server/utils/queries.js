const File = require('../models/File');
const Folder = require('../models/Folder');

// get all files
async function getAllFiles() {
  return await File.find();
}

// get files by extension
async function getFilesByExtension(extension) {
  return await File.find({ extension });
}

// get files larger than X bytes
async function getLargeFiles(minSize) {
  return await File.find({ size: { $gt: minSize } });
}

// get files by folder name
async function getFilesInFolderByName(folderName) {
  const folder = await Folder.findOne({ name: folderName });
  if (!folder) return [];
  return await File.find({ folder: folder._id });
}

// populate folders in files
async function getFilesWithFolders() {
  return await File.find().populate("folder");
}

// get folders and their parent
async function getFoldersWithParents() {
  return await Folder.find().populate("parent");
}

// count files per extension
async function countFilesByExtension() {
  return await File.aggregate([
    { $group: { _id: "$extension", count: { $sum: 1 } } },
  ]);
}

// total file size per folder
async function getTotalSizeByFolder() {
  return await File.aggregate([
    { $group: { _id: "$folder", totalSize: { $sum: "$size" } } },
  ]);
}

// get recent files
async function getRecentFiles(limit = 5) {
  return await File.find().sort({ updatedAt: -1 }).limit(limit);
}

// get .png or .jpg files updated in last N days
async function getRecentImages(days = 7) {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return await File.find({
    extension: { $in: ["png", "jpg"] },
    updatedAt: { $gte: cutoff },
  });
}

module.exports = {
  getAllFiles,
  getFilesByExtension,
  getLargeFiles,
  getFilesInFolderByName,
  getFilesWithFolders,
  getFoldersWithParents,
  countFilesByExtension,
  getTotalSizeByFolder,
  getRecentFiles,
  getRecentImages,
};
