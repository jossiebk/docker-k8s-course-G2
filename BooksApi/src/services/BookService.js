const Book = require('../models/Book');

class BookService {
    constructor() {
        this.books = [
            new Book(1, 'Cien años de soledad', 'Realismo mágico', ['Gabriel García Márquez'], '9780307474728', '1ra', 'Editorial Sudamericana', 'Buenos Aires', 417, 'La historia de la familia Buendía a través de varias generaciones en Macondo.', 18.99, true),
            new Book(2, '1984', 'Distopía', ['George Orwell'], '9780451524935', '1ra', 'Signet Classic', 'Nueva York', 328, 'Una sociedad totalitaria donde el Estado controla todos los aspectos de la vida.', 15.99, true),
            new Book(3, 'Don Quijote de la Mancha', 'Novela', ['Miguel de Cervantes'], '9788420412146', '1ra', 'Alfaguara', 'Madrid', 1056, 'Las aventuras de un hidalgo que decide convertirse en caballero andante.', 24.99, false),
            new Book(4, 'El principito', 'Fábula', ['Antoine de Saint-Exupéry'], '9780156012195', '1ra', 'Harcourt', 'Nueva York', 96, 'Un piloto conoce a un pequeño príncipe proveniente de otro planeta.', 12.99, true),
            new Book(5, 'Harry Potter y la piedra filosofal', 'Fantasía', ['J. K. Rowling'], '9780590353427', '1ra', 'Scholastic', 'Nueva York', 309, 'Un joven descubre que es un mago y comienza sus estudios en Hogwarts.', 19.99, true),
            new Book(6, 'El Hobbit', 'Fantasía', ['J. R. R. Tolkien'], '9780547928227', '1ra', 'Houghton Mifflin', 'Boston', 310, 'Bilbo Bolsón emprende una aventura inesperada junto a un grupo de enanos.', 17.99, true),
            new Book(7, 'Orgullo y prejuicio', 'Romance', ['Jane Austen'], '9780141439518', '1ra', 'Penguin Classics', 'Londres', 480, 'Elizabeth Bennet enfrenta las expectativas sociales y el amor en la Inglaterra del siglo XIX.', 14.99, false),
            new Book(8, 'Crimen y castigo', 'Novela psicológica', ['Fiódor Dostoyevski'], '9780486415871', '1ra', 'Dover Publications', 'Nueva York', 551, 'Un estudiante enfrenta las consecuencias psicológicas y morales de un crimen.', 16.99, true),
            new Book(9, 'La metamorfosis', 'Ficción', ['Franz Kafka'], '9780553213690', '1ra', 'Bantam Classics', 'Nueva York', 96, 'Gregor Samsa despierta transformado en un insecto gigante.', 9.99, true),
            new Book(10, 'Fahrenheit 451', 'Ciencia ficción', ['Ray Bradbury'], '9781451673319', '1ra', 'Simon & Schuster', 'Nueva York', 194, 'Una sociedad donde los libros están prohibidos y son quemados por los bomberos.', 13.99, true),
            new Book(11, 'La sombra del viento', 'Misterio', ['Carlos Ruiz Zafón'], '9780143034902', '1ra', 'Penguin Books', 'Nueva York', 487, 'Un joven descubre un libro misterioso que lo lleva a investigar la vida de su autor.', 18.50, true),
            new Book(12, 'El nombre del viento', 'Fantasía', ['Patrick Rothfuss'], '9780756404741', '1ra', 'DAW Books', 'Nueva York', 662, 'Kvothe narra la historia de su vida, sus aventuras y su búsqueda de conocimiento.', 21.99, false),
            new Book(13, 'It', 'Terror', ['Stephen King'], '9781501142970', '1ra', 'Scribner', 'Nueva York', 1138, 'Un grupo de amigos enfrenta una entidad sobrenatural que adopta la forma de un payaso.', 22.99, true),
            new Book(14, 'Los juegos del hambre', 'Distopía', ['Suzanne Collins'], '9780439023481', '1ra', 'Scholastic Press', 'Nueva York', 374, 'Katniss Everdeen participa en una competencia mortal organizada por el gobierno.', 16.99, true),
            new Book(15, 'El código Da Vinci', 'Thriller', ['Dan Brown'], '9780307474278', '1ra', 'Doubleday', 'Nueva York', 689, 'Un misterio relacionado con símbolos, arte e historia lleva a una investigación internacional.', 19.99, true)
        ];
    }

    getAll() {
        return this.books;
    }

    getById(id) {
        return this.books.find(book => book.id === id);
    }

    create(bookData) {
        const nextId = this.books.length === 0
            ? 1
            : Math.max(...this.books.map(book => book.id)) + 1;

        const book = new Book(
            nextId,
            bookData.titulo,
            bookData.genero,
            bookData.autores,
            bookData.isbn,
            bookData.edicion,
            bookData.editorial,
            bookData.lugarDePublicacion,
            bookData.noPaginas,
            bookData.resumen,
            bookData.precio,
            bookData.disponibleReserva
        );

        this.books.push(book);

        return book;
    }

    update(id, bookData) {
        const book = this.getById(id);

        if (!book) {
            return null;
        }

        book.titulo = bookData.titulo;
        book.genero = bookData.genero;
        book.autores = bookData.autores;
        book.isbn = bookData.isbn;
        book.edicion = bookData.edicion;
        book.editorial = bookData.editorial;
        book.lugarDePublicacion = bookData.lugarDePublicacion;
        book.noPaginas = bookData.noPaginas;
        book.resumen = bookData.resumen;
        book.precio = bookData.precio;
        book.disponibleReserva = bookData.disponibleReserva;

        return book;
    }

    delete(id) {
        const index = this.books.findIndex(book => book.id === id);

        if (index === -1) {
            return false;
        }

        this.books.splice(index, 1);

        return true;
    }
}

module.exports = BookService;