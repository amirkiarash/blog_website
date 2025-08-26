import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

// In-memory storage for blog posts
let posts = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.post('/post', (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        posts.push({ id: Date.now(), title, content });
    }
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render('edit', { post });
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

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});