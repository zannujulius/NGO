const   express         = require('express'),
        app             = express(),
        mongoose        = require('mongoose'),
        multer          = require('multer'),
        ejs             = require('ejs'),
        indexRoutes     = require('./routes/index'),
        path            = require('path'),
        adminRouter     = require('./routes/admin'),
        paymentRouter    = require('./routes/paystack');
        bodyParser      = require('body-parser'),
        request         = require('request'),
        flash           = require('connect-flash'),
        User            = require('./models/user'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        Image           = require('./models/image');

mongoose.connect("mongodb://localhost:27017/Graham", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() =>{
    console.log('Mongoose Connected!!!')
}).catch(err => console.log(err));


//passport Config
app.use(require("express-session")({
    secret: "super-secret-password",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, 'public', 'uploads'))
    },
    filename: (req, file, cb) =>{
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
})


app.use(multer({storage: storage}).single('image'))
app.set('view engine', 'ejs');
app.use('/admin', adminRouter)
app.use(express.static('/uploads'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false}))


app.use(indexRoutes)
app.use(paymentRouter);

app.get('/addimage', (req, res) => {
    res.render('addimage')
})

app.get('/gallery', (req, res) => {
    Image.fetchAll(image => {
        res.render('gallery', {
            header: 'Our journey so far to help save huminity',
            image: image
        })
    })
})


app.post('/addimage', (req, res) => {
    const imageUrl = req.file.filename;
    const name = req.body.imageName;
    const image = new Image(name, imageUrl)
    image.save();
    res.redirect('/gallery')
})


app.get("/register", function(req, res){
    res.render("register")
;})

app.post("/register", function(req, res){
    //registing a new user
    //model for new User
    var newUser = new User({username: req.body.username})
    //passport reistration for new user
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        }
        //register the new user as a local i.e from his/her system
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        })
    })
});

//Login route
app.get("/login", function(req, res){
    res.render("login");
});

//app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), 
    function(req, res){
})

app.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next(); 
    }
    res.redirect("/login");
}

app.get('*', (req, res) => {
    res.status(404).send('<h1>Error page Not found<h1>')
});

app.listen(3000, () => {
    console.log('Server started on Port 3000!!!')
});

