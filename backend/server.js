const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/social-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    profileImg: String,
    majorInterest: String,
    currentPosition: String,
});

const User = mongoose.model('User', userSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

app.post('/api/register', upload.single('profileImg'), async (req, res) => {
    const { username, email, password, phoneNumber, majorInterest, currentPosition } = req.body;
    const profileImg = req.file ? req.file.filename : null;

    try {
        const newUser = new User({
            username,
            email,
            password,
            phoneNumber,
            profileImg,
            majorInterest,
            currentPosition,
        });

        await newUser.save();

        res.json({ message: 'User signed up successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});