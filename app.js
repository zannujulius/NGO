const   express         = require('express'),
        app             = express(),
        mongoose        = require('mongoose'),
        multer          = require('multer'),
        ejs             = require('ejs'),
        // adminRoute      = require('./routes/admin')
        indexRoutes     = require('./routes/index'),
        path            = require('path'),
        adminRouter     = require('./routes/admin'),
        paymentRouter    = require('./routes/paystack');
        bodyParser      = require('body-parser'),
        request         = require('request');

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/Graham", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() =>{
    console.log('Mongoose Connected!!!')
}).catch(err => console.log(err));

app.use('/admin', adminRouter)
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true}))

app.use(indexRoutes)
app.use(paymentRouter);

app.get('*', (req, res) => {
    res.status(404).send('<h1>Error page Not found<h1>')
});

app.get('/error', (req, res)=>{
    res.render('error.pug');
})


app.listen(3000, () => {
    console.log('Server started on Port 3000!!!')
});

