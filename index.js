const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'html', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'html', 'about.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'html', 'cart.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'html', 'product.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'html', 'products.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'html', 'checkout.html'));
});

app.listen(port, () => {
    console.log(`Salt server listening at http://localhost:${port}`);
});
