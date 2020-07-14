const   express = require('express'),
        router  = express.Router(),
        Blog    = require('../models/blog'),
        Causes  = require('../models/causes');
   
// index page routes 
router.get('/', (req, res) => {
    res.render('index');
});

//about routes
router.get('/about', (req, res) => {
    res.render('about', {
        header: 'Who we are and what we aim to achieve'
    });
});

//contact route 
router.get('/contact', (req, res) => {
    res.render('contact', {
        header: 'Contact'
    })
})

//cause route
router.get('/causes', (req, res) => {
    Causes.find({}, (err, causes) => {
        if(err){
            console.log(err)
        }else{
            res.render('causes', {
                header: ' Our causes',
                causes: causes
            })
        }
    })
})

//blog route 
router.get('/blog', (req, res) => {
   Blog.find()
   .then(blog => {
        res.render('blog', {
            blog: blog,
            header: 'Blog'
        });
   })
   .catch(err => console.log(err))
})

//single-blog post
router.get('/blog/:id', (req, res) => {
    const blogId = req.params.id;
    // console.log(blogId);
    Blog.findById(blogId)
    .then(blog => {
        // console.log(blog)
        res.render('single-blog', {
            blog: blog
        })
    })
    .catch(err => console.log(err))
});


 
module.exports = router;