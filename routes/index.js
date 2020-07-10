const blog = require('../models/blog');

const   express = require('express'),
        router  = express.Router(),
        Blog    = require('../models/blog');

// index page routes 
router.get('/', (req, res) => {
    res.render('index');
});

//about routes
router.get('/about', (req, res) => {
    res.render('about');
});

//contact route 
router.get('/contact', (req, res) => {
    res.render('contact')
})

//cause route
router.get('/causes', (req, res) => {
    res.render('causes')
})

//blog route 
router.get('/blog', (req, res) => {
   Blog.find()
   .then(blog => {
        res.render('blog', {
            blog: blog
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

// gallery routes
router.get('/gallery', (req, res) => {
    res.render('gallery')
});



module.exports = router;