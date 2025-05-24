import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';
import { OrderDetails } from '../../models/user.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-purchase-suppliers',
  templateUrl: './purchase-suppliers.component.html',
  styleUrls: ['./purchase-suppliers.component.scss'],
  standalone: true,
  // Removed invalid imports array
  imports:[RouterOutlet,RouterLink,MatIconModule,MatCardModule,MatButtonModule,MatTabsModule,MatTableModule,CommonModule],
})
export class PurchaseSuppliersComponent {
  // navLinks = [
  //   { path: 'orders', label: 'Orders' },
  //   { path: 'transactions', label: 'Transactions' }
  // ];
  displayedColumns: string[] = ['orderId', 'orderDate', 'totalAmount', 'transactionId'];
  Orders: OrderDetails[]=[];
  
  constructor(
    private router: Router,
    private apiservice:ApiService,
    private orderservice: OrderService) {}
    
    ngOnInit(): void{
      this.GetOrders();
    }
  
    GetOrders() : void {
     this.orderservice.getOrders().subscribe({
      next:(orders)=>{
        this.Orders=orders
      },
      error: () => {
        console.error('Failed to load orders');
      }
     })
    }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
}