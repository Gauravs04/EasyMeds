import { Component, Pipe } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { DrugService } from '../../services/drug.service';
import { MatCardModule } from '@angular/material/card';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  standalone:true,
  selector: 'app-supplier-orders',
  imports: [MatIconModule,MatCardModule,CommonModule,MatListModule,RouterLink,RouterOutlet,
            MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,  
    MatDividerModule,
    
  ],
  templateUrl: './supplier-orders.component.html',
  styleUrl: './supplier-orders.component.css'
})
export class SupplierOrdersComponent {
   loading: boolean = false;
  Orders: Order[]=[]
  UserId:string | null= ''
  constructor(private orderService:OrderService,
              private drugService:DrugService,
              private authService:AuthService){}

  ngOnInit(){
    this.GetOrders()
  }

  // GetOrders(): void{
  //   this.orderService.getOrders().subscribe({
  //     next:(response)=>{
  //       this.UserId=this.authService.getUserIdFromToken()
  //       console.log(response);
  //       // this.Orders=response.filter(response=>response.)
  //     },
  //     error:()=>{
  //       console.error("Failed to load errors")
  //     }
  //   })
  // }



  // GetOrders(): void {
  //   const UserId = this.authService.getUserIdFromToken();
  //   this.orderService.getOrdersBySupplier(UserId!).subscribe({
  //     next: (response) => {
        
        
  //       // Filter orders where supplierId matches logged-in user
  //       // this.Orders = response.filter(order => 
  //       //   order.supplierId === this.UserId && 
  //       //   order.orderItems !== null
  //       // );
  //       this.Orders=response
        
  //       console.log('Filtered Orders:', this.Orders);
  //     },
  //     error: (err) => {
  //       console.error("Failed to load orders:", err);
  //     }
  //   });
  // }


  GetOrders(): void {
  const UserId = this.authService.getUserIdFromToken();
  this.orderService.getOrdersBySupplier(UserId!).subscribe({
    next: (response) => {
      // 1. Handle object response structure
      if (response && response) {
        // 2. Convert object to array and filter
        this.Orders = response
          .filter((order: any) => 
            order.supplierId === UserId && 
            order.orderItems // Remove orders without items
          )
          // 3. Ensure orderItems is always an array
          .map((order: any) => ({
            ...order,
            orderItems: order.orderItems || []
          }));
      } else {
        this.Orders = [];
      }
      console.log('Processed Orders:', this.Orders);
    },
    error: (err) => console.error("Error:", err)
  });
}

  getStatusClass(status: number): string {
    switch(status) {
      case 1: return 'status-pending';
      case 2: return 'status-approved';
      case 3: return 'status-rejected';
      default: return 'status-unknown';
    }
  }

  getStatusText(status: number): string {
    switch(status) {
      case 1: return 'Pending';
      case 2: return 'Approved';
      case 3: return 'Rejected';
      default: return 'Unknown';
    }
  }

  // acceptDrug(orderId: string, drugId: string) {
  //   this.orderService.updateDrugStatus(orderId, drugId, 'approve').subscribe({
  //     next: () => this.updateOrderStatus(orderId, drugId, 2),
  //     error: (err) => console.error('Approval failed:', err)
  //   });
  // }

  // rejectDrug(orderId: string, drugId: string) {
  //   this.orderService.updateDrugStatus(orderId, drugId, 'reject').subscribe({
  //     next: () => this.updateOrderStatus(orderId, drugId, 3),
  //     error: (err) => console.error('Rejection failed:', err)
  //   });
  // }

  private updateOrderStatus(orderId: string, status: number) {
    this.orderService.UpdateOrder(orderId,status);
  }

  private calculateDrugPrice(item: any): number {
    // Implement your actual price calculation logic
    return item.quantity * 100; // Example calculation
  }

}
