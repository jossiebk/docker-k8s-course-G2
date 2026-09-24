import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Order } from '../../models/order';
import { Orders } from '../../services/orders';

@Component({
  selector: 'app-orders',
  imports: [FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersPage implements OnInit {

  orders: Order[] = [];
  filteredOrders: Order[] = [];

  searchId = '';
  showForm = false;

  newOrder: Omit<Order, 'id'> = {
    tituloLibro: '',
    nombreUsuario: '',
    precio: 0,
    fechaHoraCompra: ''
  };

  constructor(private readonly ordersService: Orders) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    console.log('ORDERS: iniciando GET');

    this.ordersService.getAll().subscribe({
      next: (orders) => {
        console.log('ORDERS: respuesta recibida:', orders);

        this.orders = orders;
        this.filteredOrders = orders;

        console.log(
          'ORDERS: registros asignados:',
          this.orders.length
        );
      },
      error: (error) => {
        console.error('ORDERS: ERROR:', error);
      }
    });
  }

  search(): void {
    const id = Number(this.searchId);

    if (!this.searchId.trim()) {
      this.filteredOrders = this.orders;
      return;
    }

    if (Number.isNaN(id)) {
      this.filteredOrders = [];
      return;
    }

    this.ordersService.getById(id).subscribe({
      next: (order) => {
        this.filteredOrders = [order];
      },
      error: (error) => {
        console.error('ORDER SEARCH ERROR:', error);
        this.filteredOrders = [];
      }
    });
  }

  clearSearch(): void {
    this.searchId = '';
    this.filteredOrders = this.orders;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createOrder(): void {
    this.ordersService.create(this.newOrder).subscribe({
      next: (order) => {
        console.log('ORDER CREATED:', order);

        this.orders.push(order);
        this.filteredOrders = this.orders;

        this.newOrder = {
          tituloLibro: '',
          nombreUsuario: '',
          precio: 0,
          fechaHoraCompra: ''
        };

        this.showForm = false;
      },
      error: (error) => {
        console.error('ORDER CREATE ERROR:', error);
      }
    });
  }
}