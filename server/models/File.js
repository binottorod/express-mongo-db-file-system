const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: { type: String, required: true },
    extension: { type: String, required: true },
    folder: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
    size: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);