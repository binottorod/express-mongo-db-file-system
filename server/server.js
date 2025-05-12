const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const fileRoutes = require('./routes/files');
const folderRoutes = require('./routes/folders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is working!'});
});

app.use('/api/files', fileRoutes);
app.use('/api/folders', folderRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});