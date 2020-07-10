const   express         = require('express'),
        bodyParser      = require('body-parser'),
        app             = express(),
        mongoose        = require('mongoose'),
        multer          = require('multer'),
        ejs             = require('ejs'),
        // adminRoute      = require('./routes/admin')
        indexRoutes     = require('./routes/index'),
        path            = require('path'),
        adminRouter     = require('./routes/admin');

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/Graham", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() =>{
    console.log('Mongoose Connected!!!')
}).catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true}))

app.use(indexRoutes)
app.use('/admin', adminRouter)

app.get('*', (req, res) => {
    res.status(404).send('<h1>Error page Not found<h1>')
});

app.listen(3000, () => {
    console.log('Server started on Port 3000!!!')
});

