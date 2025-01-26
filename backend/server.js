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

const followSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    followId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Follow = mongoose.model('Follow', followSchema);

const relationshipScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    followId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number,
});

const RelationshipScore = mongoose.model('RelationshipScore', relationshipScoreSchema);

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

// 팔로우 API
app.post('/api/follow', async (req, res) => {
    const { userId, followId } = req.body;

    const newFollow = new Follow({
        userId,
        followId,
    });

    try {
        await newFollow.save();
        res.status(201).send('Followed successfully');
    } catch (error) {
        res.status(500).send('Error following user');
    }
});

// 관계지수 계산 API
app.post('/api/calculateRelationshipScore', async (req, res) => {
    const { userId, followId } = req.body;

    // 관계지수 계산 로직 (예: 공통 관심사, 대화 빈도 등)
    const score = Math.floor(Math.random() * 100); // 예시: 랜덤 점수

    const newRelationshipScore = new RelationshipScore({
        userId,
        followId,
        score,
    });

    try {
        await newRelationshipScore.save();
        res.status(201).send({ score });
    } catch (error) {
        res.status(500).send('Error calculating relationship score');
    }
});

// 유저 검색 API
app.get('/api/searchUsers', async (req, res) => {
    const { query } = req.query;

    try {
        const users = await User.find({ username: new RegExp(query, 'i') });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send('Error searching users');
    }
});

// 유저 정보 API
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error fetching user info');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});