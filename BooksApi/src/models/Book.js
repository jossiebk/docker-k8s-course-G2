class Book {
    constructor(
        id,
        titulo,
        genero,
        autores,
        isbn,
        edicion,
        editorial,
        lugarDePublicacion,
        noPaginas,
        resumen,
        precio,
        disponibleReserva
    ) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.autores = autores;
        this.isbn = isbn;
        this.edicion = edicion;
        this.editorial = editorial;
        this.lugarDePublicacion = lugarDePublicacion;
        this.noPaginas = noPaginas;
        this.resumen = resumen;
        this.precio = precio;
        this.disponibleReserva = disponibleReserva;
    }
}

module.exports = Book;