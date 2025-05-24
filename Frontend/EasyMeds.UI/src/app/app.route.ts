import { Routes } from '@angular/router';
import { AuthComponent } from './Components/Auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashComponent } from './Admin/admin-dash/admin-dash.component';
import { ManageDrugsComponent } from './Admin/inventory/inventory.component'; 
import { HomeComponent } from './Admin/Home-page/home.component';
import { PurchaseSuppliersComponent } from './Admin/Purchase-Suppliers/purchase-suppliers.component';
import { CartComponent } from './Admin/Cart/cart.component';
import { AdminDashHomeComponent } from './Admin/admin-dash-home/admin-dash-home.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "cart", component: CartComponent },  
  { path: "login", component: AuthComponent },
  { path: "admin-dash", component: AdminDashComponent, canActivate: [AuthGuard], children: [
    { path: "home", component: AdminDashHomeComponent },
    { path: "inventory", component: ManageDrugsComponent },
    { path: "purchase-suppliers", component: PurchaseSuppliersComponent }
  ] },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];
