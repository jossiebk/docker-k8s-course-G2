const express = require('express');
const cors = require('cors');
const booksController = require('./controllers/BooksController');

const app = express();

const PORT = process.env.PORT || 6002;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        service: 'BooksApi',
        status: 'running'
    });
});

app.get('/health/live', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
});

app.get('/health/ready', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
});

app.use('/api/books', booksController);

app.listen(PORT, () => {
    console.log(`BooksApi listening on port ${PORT}`);
});