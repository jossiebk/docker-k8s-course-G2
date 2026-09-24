import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from '../../models/user';
import { UsersService } from '../../services/users';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users: User[] = [];

  searchId: number | null = null;

  editingUserId: number | null = null;

  formUser: Omit<User, 'id'> = {
    nombre: '',
    correo: '',
    edad: 0,
    estado: true
  };

  message = '';
  errorMessage = '';

  constructor(private readonly usersService: UsersService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.clearMessages();

    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.errorMessage = 'No fue posible obtener los usuarios.';
      }
    });
  }

  searchUser(): void {
    this.clearMessages();

    if (this.searchId === null || this.searchId <= 0) {
      this.errorMessage = 'Ingresa un ID válido.';
      return;
    }

    this.usersService.getById(this.searchId).subscribe({
      next: (user) => {
        this.users = [user];
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'No se encontró un usuario con ese ID.';
        } else {
          this.errorMessage = 'No fue posible buscar el usuario.';
        }

        this.users = [];
      }
    });
  }

  showAllUsers(): void {
    this.searchId = null;
    this.loadUsers();
  }

  submitForm(): void {
    this.clearMessages();

    if (
      !this.formUser.nombre.trim() ||
      !this.formUser.correo.trim() ||
      this.formUser.edad <= 0
    ) {
      this.errorMessage = 'Completa todos los campos correctamente.';
      return;
    }

    if (this.editingUserId === null) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser(): void {
    this.usersService.create(this.formUser).subscribe({
      next: () => {
        this.message = 'Usuario creado correctamente.';
        this.resetForm();
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'No fue posible crear el usuario.';
      }
    });
  }

  editUser(user: User): void {
    this.clearMessages();

    this.editingUserId = user.id;

    this.formUser = {
      nombre: user.nombre,
      correo: user.correo,
      edad: user.edad,
      estado: user.estado
    };
  }

  updateUser(): void {
    if (this.editingUserId === null) {
      return;
    }

    this.usersService.update(
      this.editingUserId,
      this.formUser
    ).subscribe({
      next: () => {
        this.message = 'Usuario actualizado correctamente.';
        this.resetForm();
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'No fue posible actualizar el usuario.';
      }
    });
  }

  deleteUser(user: User): void {
    this.clearMessages();

    const confirmed = confirm(
      `¿Deseas eliminar al usuario "${user.nombre}"?`
    );

    if (!confirmed) {
      return;
    }

    this.usersService.delete(user.id).subscribe({
      next: () => {
        this.message = 'Usuario eliminado correctamente.';
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'No fue posible eliminar el usuario.';
      }
    });
  }

  resetForm(): void {
    this.editingUserId = null;

    this.formUser = {
      nombre: '',
      correo: '',
      edad: 0,
      estado: true
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