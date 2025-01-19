const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/social-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 파일 저장 디렉토리 생성
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

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

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ message: 'Login successful', data: user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});