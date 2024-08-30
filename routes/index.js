const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local');


const userModel = require('./user.js')
const postModel = require('./posts.js')
const upload = require('./multer.js');

passport.use(new localStrategy(userModel.authenticate()));

//router
router.get('/', (req, res) => {
  res.render('index')
});
router.get('/register', (req, res) => {
  res.render('Register')
});
router.get('/home', isLoggedIn, async (req, res) => {
  const movies = await postModel.find();
  res.render('home', { movies })
})
router.get('/movie/:id', isLoggedIn, async (req, res) => {
  const movie = await postModel.findById(req.params.id);
  res.render('Movie', { movie });
});

router.get('/adminpanel', (req, res) => {
  res.render('admin')
}) 

router.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const movies = await postModel.find({ moviename: new RegExp(query, 'i') });
    res.render('search-results', { movies, query });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for movies.');
  }
});


//post method
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}), function(req, res){
})

router.post('/register', (req, res) => {
  const { fullname, username, password, email } = req.body;
  const userData = new userModel({ username, email, fullname });
  
  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/home')
    })
  })
});

router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

router.post('/add', isLoggedIn, (req, res) => {
  // Create a new movie entry
  const newMovie = new postModel({
    moviename: req.body.moviename,
    filesize: req.body.filesize,
    downloadlink: req.body.downloadlink,
    filesize2: req.body.filesize2,
    downloadlink2: req.body.downloadlink2,
    movietype: req.body.movietype,
    language: req.body.language,
    description: req.body.description,
    imageurl: req.body.imageurl,
    date: req.body.date, // Ensure date is a valid Date object
  });

  newMovie.save()
    .then(() => {
      console.log('Movie added successfully!');
      res.redirect('/home');
    })
    .catch(err => {
      console.error('Error adding movie:', err);
      res.status(500).send('Failed to add movie');
    });
});


module.exports = router;