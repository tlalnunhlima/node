const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
global.loggedIn = null;

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());
app.use(flash());

app.use(expressSession({
 secret: 'keyboard cat'
}))

app.use("*", (req, res, next) => {
   loggedIn = req.session.userId;
   next();
})

mongoose.connect('mongodb+srv://user:Fl0lfDFcNHB7OVN8@cluster0.24mkr.mongodb.net/my_database', {useNewUrlParser:true, useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true, useUnifiedTopology: true});

let port = process.env.PORT;
if(port == null || port == "") {
   port = 5000;
}

app.listen(port, () => {
   console.log('App listening on port 4000');
});


const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const logoutController = require('./controllers/logout');
const loginUserController = require('./controllers/loginUser');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');



app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));

