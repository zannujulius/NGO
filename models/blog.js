const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogTitle: String,
    blogImage: String,
    textOne: String,
    textTwo: String,
    authorName: String,
    authorImage: String
})

const Blog = mongoose.model('Blog', blogSchema)

// Blog.create({
//     blogTitle: 'Sickle cell Anemia',
//     blogImage: '/img/blog/blog_2.png',
//     textOne: 'Lorem ipsu, dolor ispsum concet avet insporum',
//     textTwo: 'Lorem ipsu, dolor ispsum concet avet insporum Lorem ipsu, dolor ispsum concet avet insporum',
//     authorName: 'james mark',
//     authorImage: '/img/blog/author.png'
// }).then(() => {
//     console.log('Blog created!!!')
// }).catch(err => console.log(err))


module.exports = mongoose.model('Blog', blogSchema);