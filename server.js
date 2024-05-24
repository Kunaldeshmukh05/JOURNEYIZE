const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Post = require('./models/Post');
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/journeyize', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  password: String,
  profilePicture: String
});

const User = mongoose.model('User', userSchema);

// POST endpoint to handle registration
app.post('/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    const profilePicture = req.file ? req.file.filename : '';

    const newUser = new User({
      username,
      fullName,
      email,
      password,
      profilePicture
    });

    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});


//for user post 

app.post('/posts', upload.single('media'), async (req, res) => {
    const { description } = req.body;
    const media = req.file ? req.file.filename : null;
  
    try {
      const newPost = new Post({
        description,
        media,
      });
  
      await newPost.save();
      res.status(201).json({ message: 'Post uploaded successfully', post: newPost });
    } catch (error) {
      console.error('Error uploading post', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
