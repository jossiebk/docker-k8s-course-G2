import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Book } from '../../models/book';
import { Books } from '../../services/books';

@Component({
  selector: 'app-books',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class BooksPage implements OnInit {

  books: Book[] = [];

  searchId: number | null = null;

  editingBookId: number | null = null;

  formBook: Omit<Book, 'id'> = {
    titulo: '',
    genero: '',
    autores: '',
    isbn: '',
    edicion: '',
    editorial: '',
    lugarDePublicacion: '',
    noPaginas: 0,
    resumen: '',
    precio: 0,
    disponibleReserva: true
  };

  message = '';
  errorMessage = '';

  constructor(private readonly booksService: Books) {
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.clearMessages();

    this.booksService.getAll().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: () => {
        this.errorMessage = 'No fue posible obtener los libros.';
      }
    });
  }

  searchBook(): void {
    this.clearMessages();

    if (this.searchId === null || this.searchId <= 0) {
      this.errorMessage = 'Ingresa un ID válido.';
      return;
    }

    this.booksService.getById(this.searchId).subscribe({
      next: (book) => {
        this.books = [book];
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'No se encontró un libro con ese ID.';
        } else {
          this.errorMessage = 'No fue posible buscar el libro.';
        }

        this.books = [];
      }
    });
  }

  showAllBooks(): void {
    this.searchId = null;
    this.loadBooks();
  }

  submitForm(): void {
    this.clearMessages();

    if (
      !this.formBook.titulo.trim() ||
      !this.formBook.genero.trim() ||
      !this.formBook.autores.trim() ||
      !this.formBook.isbn.trim() ||
      !this.formBook.edicion.trim() ||
      !this.formBook.editorial.trim() ||
      !this.formBook.lugarDePublicacion.trim() ||
      this.formBook.noPaginas <= 0 ||
      !this.formBook.resumen.trim() ||
      this.formBook.precio < 0
    ) {
      this.errorMessage = 'Completa todos los campos correctamente.';
      return;
    }

    if (this.editingBookId === null) {
      this.createBook();
    } else {
      this.updateBook();
    }
  }

  createBook(): void {
    this.booksService.create(this.formBook).subscribe({
      next: () => {
        this.message = 'Libro creado correctamente.';
        this.resetForm();
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'No fue posible crear el libro.';
      }
    });
  }

  editBook(book: Book): void {
    this.clearMessages();

    this.editingBookId = book.id;

    this.formBook = {
      titulo: book.titulo,
      genero: book.genero,
      autores: book.autores,
      isbn: book.isbn,
      edicion: book.edicion,
      editorial: book.editorial,
      lugarDePublicacion: book.lugarDePublicacion,
      noPaginas: book.noPaginas,
      resumen: book.resumen,
      precio: book.precio,
      disponibleReserva: book.disponibleReserva
    };
  }

  updateBook(): void {
    if (this.editingBookId === null) {
      return;
    }

    this.booksService.update(
      this.editingBookId,
      this.formBook
    ).subscribe({
      next: () => {
        this.message = 'Libro actualizado correctamente.';
        this.resetForm();
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'No fue posible actualizar el libro.';
      }
    });
  }

  deleteBook(book: Book): void {
    this.clearMessages();

    const confirmed = confirm(
      `¿Deseas eliminar el libro "${book.titulo}"?`
    );

    if (!confirmed) {
      return;
    }

    this.booksService.delete(book.id).subscribe({
      next: () => {
        this.message = 'Libro eliminado correctamente.';
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'No fue posible eliminar el libro.';
      }
    });
  }

  resetForm(): void {
    this.editingBookId = null;

    this.formBook = {
      titulo: '',
      genero: '',
      autores: '',
      isbn: '',
      edicion: '',
      editorial: '',
      lugarDePublicacion: '',
      noPaginas: 0,
      resumen: '',
      precio: 0,
      disponibleReserva: true
    };
  }

  cancelEdit(): void {
    this.resetForm();
    this.clearMessages();
  }

  private clearMessages(): void {
    this.message = '';
    this.errorMessage = '';
  }
}