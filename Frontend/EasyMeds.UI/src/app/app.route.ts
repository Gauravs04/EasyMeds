import { Routes } from '@angular/router';
import { AuthComponent } from './Components/Auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashComponent } from './Admin/admin-dash/admin-dash.component';
import { ManageDrugsComponent } from './Admin/inventory/inventory.component'; 
import { HomeComponent } from './Admin/Home-page/home.component';
import { PurchaseSuppliersComponent } from './Admin/Purchase-Suppliers/purchase-suppliers.component';
import { CartComponent } from './Admin/Cart/cart.component';
import { AdminDashHomeComponent } from './Admin/admin-dash-home/admin-dash-home.component';
import { SupplierHomeComponent } from './Supplier/home/supplier-home.component';
import { SupplierOrdersComponent } from './Supplier/Orders/supplier-orders.component';
import { SupplierInventoryComponent } from './Supplier/Inventory/supplier-inventory/supplier-inventory.component';



export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "cart", component: CartComponent },  
  { path: "login", component: AuthComponent },
  { path: "admin-dash", component: AdminDashComponent, canActivate: [AuthGuard],data:{role:"Admin"}, children: [
    { path: "home", component: AdminDashHomeComponent },
    { path: "inventory", component: ManageDrugsComponent },
    { path: "purchase-suppliers", component: PurchaseSuppliersComponent }
  ] },
  { path:'supplier-dash', component: SupplierHomeComponent, canActivate:[AuthGuard],data:{role:"Supplier"}, children:[
    {path:"orders",component: SupplierOrdersComponent},
    { path:"inventory", component: SupplierInventoryComponent}
  ]},
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];
