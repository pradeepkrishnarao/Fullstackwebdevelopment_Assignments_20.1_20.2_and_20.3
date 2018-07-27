var express = require('express');
var app = express();
var path = require('path');

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("view options", { layout: false });
app.use(express.static(path.join(__dirname, 'public')));

//blog posts defined in json format
const posts = [
    {
        id: 1,
        author: 'Sam',
        title: 'Web application using express',
        body: 'Blog post #1'
    },
    {
        id: 2,
        author: 'Jeff',
        title: 'express Router',
        body: 'Blog post #2'
    },
    {
        id: 3,
        author: 'Kate',
        title: 'API\'s in express',
        body: 'Blog post #3'
    },
    {
        id: 4,
        author: 'Sarah',
        title: 'Rendering using EJS',
        body: 'Blog post #4'
    }
];

app.get('/', function(req, res) {
    res.render('pages/home');
})

app.get('/about', function (req, res) {
    res.render('pages/about');
})

app.get('/posts', function (req, res) {
    res.render('pages/posts', { posts: posts })
})

app.get('/post/:id', (req, res) => {
    //Filters by id and finds the post in the posts array
    const post = posts.filter((post) => {
        return post.id == req.params.id
    })[0]

    // post.ejs` template with the post content is rendered `
    res.render('pages/post', {
        author: post.author,
        title: post.title,
        body: post.body
    })
})

module.exports = app;
console.log('http://localhost:3000 ..started');