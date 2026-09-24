const express = require('express');
const BookService = require('../services/BookService');

const router = express.Router();
const bookService = new BookService();

router.get('/', (req, res) => {
    try {
        console.log('GET /api/books - Inicio');

        const books = bookService.getAll();

        console.log(`GET /api/books - Respuesta 200. Libros: ${books.length}`);

        res.status(200).json(books);
    } catch (error) {
        console.error('GET /api/books - Error:', error);
        res.status(500).json({ message: 'Ocurrió un error interno.' });
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        console.log(`GET /api/books/${id} - Inicio`);

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: 'El ID debe ser un número entero.' });
        }

        const book = bookService.getById(id);

        if (!book) {
            console.warn(`GET /api/books/${id} - Libro no encontrado`);
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        console.log(`GET /api/books/${id} - Respuesta 200`);

        res.status(200).json(book);
    } catch (error) {
        console.error(`GET /api/books/${req.params.id} - Error:`, error);
        res.status(500).json({ message: 'Ocurrió un error interno.' });
    }
});

router.post('/', (req, res) => {
    try {
        console.log('POST /api/books - Inicio');

        const book = bookService.create(req.body);

        console.log(`POST /api/books - Libro creado. Id: ${book.id}`);

        res.status(201).json(book);
    } catch (error) {
        console.error('POST /api/books - Error:', error);
        res.status(500).json({ message: 'Ocurrió un error interno.' });
    }
});

router.put('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        console.log(`PUT /api/books/${id} - Inicio`);

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: 'El ID debe ser un número entero.' });
        }

        const book = bookService.update(id, req.body);

        if (!book) {
            console.warn(`PUT /api/books/${id} - Libro no encontrado`);
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        console.log(`PUT /api/books/${id} - Respuesta 200`);

        res.status(200).json(book);
    } catch (error) {
        console.error(`PUT /api/books/${req.params.id} - Error:`, error);
        res.status(500).json({ message: 'Ocurrió un error interno.' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        console.log(`DELETE /api/books/${id} - Inicio`);

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: 'El ID debe ser un número entero.' });
        }

        const deleted = bookService.delete(id);

        if (!deleted) {
            console.warn(`DELETE /api/books/${id} - Libro no encontrado`);
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        console.log(`DELETE /api/books/${id} - Respuesta 204`);

        res.status(204).send();
    } catch (error) {
        console.error(`DELETE /api/books/${req.params.id} - Error:`, error);
        res.status(500).json({ message: 'Ocurrió un error interno.' });
    }
});


module.exports = router;