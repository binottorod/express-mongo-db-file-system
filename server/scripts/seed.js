const mongoose = require('mongoose');
require('dotenv').config();

const Folder = require('../models/Folder');
const File = require('../models/File');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to MongoDB');

    await Folder.deleteMany({});
    await File.deleteMany({});

    // Create folders
    const root = await Folder.create({ name: 'root' });
    const docs = await Folder.create({ name: 'documents', parent: root._id });
    const imgs = await Folder.create({ name: 'images', parent: root._id });
    const misc = await Folder.create({ name: 'misc', parent: docs._id });

    // Create files
    await File.create([
        { name: 'Resume', extension: 'pdf', folder: docs._id, size: 124000 },
        { name: 'Notes', extension: 'txt', folder: docs._id, size: 1200 },
        { name: 'Dog', extension: 'jpg', folder: imgs._id, size: 2048000 },
        { name: 'Screenshot', extension: 'png', folder: imgs._id, size: 900000 },
        { name: 'Temp', extension: 'tmp', folder: misc._id, size: 128 },
      ]);
    
    console.log('✅ Mock data inserted!');
    mongoose.disconnect();
}

seed().catch(console.error);