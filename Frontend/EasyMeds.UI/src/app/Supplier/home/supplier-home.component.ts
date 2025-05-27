import { Component } from '@angular/core';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone:true,
  selector: 'app-supplier-home',
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './supplier-home.component.html',
  styleUrl: './supplier-home.component.css'
})
export class SupplierHomeComponent {
  constructor(private authService: AuthService) {}
    isCollapsed = false;
  
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
    logout(): void {
      this.authService.logout()
    }
}
