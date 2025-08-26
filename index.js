import express from "express";
import bodyParser from "body-parser";
//import { get } from "http";

const app = express();
const port = 3500;

let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.post("/post", (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        posts.push({ id: Date.now(), title, content});
        //res.render("index.ejs", {postTitle: title, postContent: content});
    }
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render('edit.ejs', { post });
    } else {
        res.redirect('/');
    }
});

app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex !== -1 && title && content) {
        posts[postIndex] = { id: posts[postIndex].id, title, content };
    }
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}.`);
});