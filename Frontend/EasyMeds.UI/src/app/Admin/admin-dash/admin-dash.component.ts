import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-dash',
  imports: [AppComponent,RouterOutlet,RouterLink,CommonModule,RouterModule],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  constructor(private authService: AuthService) {}
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  logout(): void {
    this.authService.logout()
  }
}
